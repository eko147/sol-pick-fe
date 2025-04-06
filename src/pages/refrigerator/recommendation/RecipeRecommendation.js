import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecipeRecommendation.css";
import RecipeLoading from "./RecipeLoading";
import backArrow from "../../../assets/backArrow.svg";
import "../list/IngredientDetailList.css";
import Header from "../../../components/common/header/Header";
import { authApi } from "../../../api/AuthApi";
import ButtonL from "../../../components/common/button/ButtonL";
const RecipeRecommendation = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentUser = authApi.getCurrentUser();
  const userId = currentUser.memberId; // 🔹 실제 로그인된 사용자 ID로 대체 필요

  useEffect(() => {
    // ✅ sessionStorage에서 기존 레시피 가져오기
    const savedRecipes = sessionStorage.getItem("recommendedRecipes");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
      setLoading(false); // ✅ 기존 데이터가 있으면 로딩 종료
    } else {
      fetchRecommendedRecipes();
    }
  }, []);

  const translateToEnglish = async (text) => {
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get`,
        {
          params: { q: text, langpair: "ko|en" },
        }
      );
      return response.data.responseData.translatedText;
    } catch (error) {
      console.error("번역 실패:", error);
      return text;
    }
  };

  const fetchRecipeImage = async (recipeName) => {
    try {
      const translatedQuery = await translateToEnglish(recipeName);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query: translatedQuery, per_page: 1 },
          headers: {
            Authorization: `Client-ID EInmdWllYzZDqaUzMPpwDdWzIESwNeM2AfQwbs8nuK8`,
          },
        }
      );

      if (response.data.results.length > 0) {
        return response.data.results[0].urls.regular;
      }
    } catch (error) {
      console.error("Unsplash 이미지 가져오기 실패:", error);
    }
    return "/images/default_recipe.jpg";
  };

  const fetchRecommendedRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      // 디버깅 로그 추가 - 요청 전
      console.log("사용자 ID:", userId);
      console.log("인증 헤더:", authApi.getAuthHeader());

      const response = await axios.get(
        `http://localhost:8090/api/refrigerator/recommend/${userId}`,
        { headers: authApi.getAuthHeader() } // 인증 헤더 추가
      );

      console.log("원본 응답 데이터:", response.data);

      let recipeData = response.data;

      // 다양한 응답 형식에 대응
      if (typeof recipeData === "string") {
        try {
          recipeData = JSON.parse(recipeData);
        } catch (parseError) {
          console.error("JSON 파싱 실패:", parseError);
          throw new Error("응답 데이터 파싱 실패");
        }
      }

      // content 속성 확인
      if (recipeData.message && recipeData.message.content) {
        try {
          recipeData = JSON.parse(recipeData.message.content);
        } catch (parseError) {
          console.error("메시지 content JSON 파싱 실패:", parseError);
          throw new Error("메시지 content 파싱 실패");
        }
      }

      // recipes 배열 검증
      if (
        !recipeData ||
        !recipeData.recipes ||
        !Array.isArray(recipeData.recipes)
      ) {
        console.error("잘못된 레시피 데이터 형식:", recipeData);
        throw new Error("레시피 데이터 형식이 유효하지 않습니다.");
      }

      const recipeList = await Promise.all(
        recipeData.recipes.map(async (recipe, index) => ({
          id: index + 1,
          name: recipe.name || "이름 없음",
          ingredients: recipe.ingredients
            ? recipe.ingredients.join(", ")
            : "재료 정보 없음",
          cooking_time: recipe.cooking_time || "조리 시간 정보 없음",
          difficulty: recipe.difficulty || "난이도 정보 없음",
          steps: recipe.steps || ["조리 방법 정보 없음"],
          image:
            (await fetchRecipeImage(recipe.name)) ||
            "/images/default_recipe.jpg",
        }))
      );

      setRecipes(recipeList);
      sessionStorage.setItem("recommendedRecipes", JSON.stringify(recipeList));
    } catch (err) {
      // 더 자세한 에러 로깅
      console.error("완전한 에러 객체:", err);
      console.error("에러 응답:", err.response);
      console.error("에러 상태:", err.response?.status);
      console.error("에러 데이터:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.message ||
          "레시피를 불러오는 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const goToRecipeDetail = (recipe) => {
    navigate(`/refrigerator/recipe-detail/${recipe.id}`, { state: { recipe } });
  };

  return (
    <>
      {/* <MainHeader /> */}
      <Header
        leftIcon={backArrow}
        title="🍽️ 추천 레시피"
        onLeftClick={() => navigate(-1)} // ✅ 뒤로 가기 시 기존 추천 유지
      />

      <div className="recipe-recommendation-container">
        {loading ? (
          <RecipeLoading />
        ) : error ? (
          <p className="error-message">❌ {error}</p>
        ) : (
          <>
            <div className="recipe-recommendation-grid">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => goToRecipeDetail(recipe)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recommend-recipe-image"
                  />
                  <p className="recommend-recipe-name">{recipe.name}</p>
                </div>
              ))}
            </div>

            {/* <button
              className="refresh-button"
              onClick={() => {
                sessionStorage.removeItem("recommendedRecipes"); // ✅ 기존 데이터 삭제
                fetchRecommendedRecipes(); // ✅ 새로운 레시피 가져오기
              }}
            >
              다른 레시피 추천받기
            </button> */}
            <ButtonL
              className="refresh-button"
              onClick={() => {
                sessionStorage.removeItem("recommendedRecipes"); // ✅ 기존 데이터 삭제
                fetchRecommendedRecipes(); // ✅ 새로운 레시피 가져오기
              }}
              text="다른 레시피 추천받기"
            />
          </>
        )}
      </div>
    </>
  );
};

export default RecipeRecommendation;
