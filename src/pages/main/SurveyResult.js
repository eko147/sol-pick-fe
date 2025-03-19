import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyResult.css"; // ✅ 스타일 파일 추가
// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";

const SurveyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ sessionStorage에서 기존 식단 데이터 가져오기
    const savedMealPlan = sessionStorage.getItem("mealPlan");

    if (savedMealPlan) {
      console.log("✅ 기존 식단 데이터 사용 (sessionStorage)");
      setMealPlan(JSON.parse(savedMealPlan));
      setLoading(false);
    } else {
      fetchMealPlan();
    }
  }, []);

  const fetchMealPlan = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:8090/api/meal-plan",
        formData
      );
      console.log("✅ 백엔드 응답:", response.data);

      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error("API 응답이 비어 있습니다.");
      }

      // ✅ 객체를 배열 형식으로 변환 (백엔드 응답 처리)
      const formattedMealPlan = Object.entries(response.data).flatMap(
        ([day, meals]) => {
          return Array.isArray(meals)
            ? meals.map((meal) => ({ day, ...meal }))
            : []; // ✅ meals가 배열인지 확인
        }
      );

      if (formattedMealPlan.length === 0) {
        throw new Error("식단 데이터가 올바르지 않습니다.");
      }

      // ✅ 변환된 데이터를 상태와 sessionStorage에 저장
      setMealPlan(formattedMealPlan);
      sessionStorage.setItem("mealPlan", JSON.stringify(formattedMealPlan));
    } catch (error) {
      console.error("❌ 식단 추천 실패:", error);
      setError("식단 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="survey-result-container">
      <Header
        leftIcon={backArrow}
        title="맞춤 식단 추천" // ✅ 레시피 제목
        onLeftClick={() => navigate(-1)}
      />

      {loading ? (
        <p className="loading">
          사용자님의 권장 영양소를 AI가 분석 중입니다...
        </p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : mealPlan.length > 0 ? (
        <div className="meal-plan">
          {mealPlan
            .reduce((acc, meal) => {
              const dayIndex = acc.findIndex((item) => item.day === meal.day);
              if (dayIndex === -1) {
                acc.push({ day: meal.day, meals: [meal] });
              } else {
                acc[dayIndex].meals.push(meal);
              }
              return acc;
            }, [])
            .map((dayData, index) => {
              // ✅ 하루 총 칼로리 계산
              const totalCalories = dayData.meals.reduce(
                (sum, meal) => sum + meal.calories,
                0
              );

              return (
                <div key={index} className="day-card">
                  <h3>
                    📅 {dayData.day}
                    <span className="total-calories">
                      총 {totalCalories} kcal
                    </span>
                  </h3>
                  <div className="meals">
                    {dayData.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="meal-card">
                        <h4>{meal.meal_type}</h4>
                        <p
                          className="meal-name"
                          onClick={() =>
                            navigate("/meal-detail", { state: { meal } })
                          }
                          style={{
                            cursor: "pointer",
                            color: "#007bff",
                            textDecoration: "underline",
                          }}
                        >
                          🍽️ {meal.menu}
                        </p>
                        <p>🔥 칼로리: {meal.calories} kcal</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p className="error">❌ 식단 데이터를 불러오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default SurveyResult;
