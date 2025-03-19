import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecipeRecommendation.css";
import RecipeLoading from "./RecipeLoading";
import Menu from "../../../components/common/menu/Menu";
import backArrow from "../../../assets/backArrow.svg";
import "../list/IngredientDetailList.css";
import Header from "../../../components/common/header/Header";

import MainHeader from "../../../components/common/header/MainHeader";
const RecipeRecommendation = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = 1;

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

      const response = await axios.get(
        `http://localhost:8090/api/refrigerator/recommend/${userId}`
      );

      let recipeData = response.data;

      if (typeof recipeData === "string") {
        recipeData = JSON.parse(recipeData);
      }

      if (recipeData.message && recipeData.message.content) {
        recipeData = JSON.parse(recipeData.message.content);
      }

      if (
        !recipeData ||
        !recipeData.recipes ||
        !Array.isArray(recipeData.recipes)
      ) {
        throw new Error("잘못된 응답 형식입니다.");
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
      sessionStorage.setItem("recommendedRecipes", JSON.stringify(recipeList)); // ✅ 저장
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "네트워크 오류 발생"
      );
    } finally {
      setLoading(false);
    }
  };

  const goToRecipeDetail = (recipe) => {
    navigate(`/recipe-detail/${recipe.id}`, { state: { recipe } });
  };

  return (
    <>
      <MainHeader />
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
            <div className="recipe-grid">
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

            <button
              className="refresh-button"
              onClick={() => {
                sessionStorage.removeItem("recommendedRecipes"); // ✅ 기존 데이터 삭제
                fetchRecommendedRecipes(); // ✅ 새로운 레시피 가져오기
              }}
            >
              다른 레시피 추천받기
            </button>
          </>
        )}
        <Menu />
      </div>
    </>
  );
};

export default RecipeRecommendation;
