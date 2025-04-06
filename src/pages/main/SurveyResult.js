import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyResult.css";
import backArrow from "../../assets/backArrow.svg";
import Header from "../../components/common/header/Header";
import { authApi } from "../../api/AuthApi";

const SurveyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = authApi.getCurrentUser();

  useEffect(() => {
    // sessionStorage에서 기존 식단 데이터 가져오기
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

      // 실제 API 요청
      const response = await axios.post(
        "http://localhost:8090/api/meal-plan",
        formData
      );
      console.log("✅ 백엔드 응답:", response.data);

      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error("API 응답이 비어 있습니다.");
      }

      // 객체를 배열 형식으로 변환 (백엔드 응답 처리)
      const formattedMealPlan = Object.entries(response.data).flatMap(
        ([day, meals]) => {
          return Array.isArray(meals)
            ? meals.map((meal) => ({ day, ...meal }))
            : [];
        }
      );

      if (formattedMealPlan.length === 0) {
        throw new Error("식단 데이터가 올바르지 않습니다.");
      }

      // 변환된 데이터를 상태와 sessionStorage에 저장
      setMealPlan(formattedMealPlan);
      sessionStorage.setItem("mealPlan", JSON.stringify(formattedMealPlan));
    } catch (error) {
      console.error("❌ 식단 추천 실패:", error);
      setError("식단 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 식단 상세 페이지로 이동하는 함수
  const handleMealClick = (meal) => {
    navigate("/meal-detail", { state: { meal } });
  };

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="맞춤 식단 추천"
        onLeftClick={() => navigate(-1)}
      />
      <div className="survey-result-container">
        {loading ? (
          <div className="survey-loading-container">
            <p className="survey-loading-text bold">
              {currentUser.name}님의 권장 영양소를
              <br />
              AI가 분석 중입니다...
            </p>
            <div className="survey-loading-bar">
              <div className="survey-loading-progress"></div>
            </div>
          </div>
        ) : error ? (
          <p className="survey-error">{error}</p>
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
                // 하루 총 칼로리 계산
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
                            onClick={() => handleMealClick(meal)}
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
          <p className="survey-error">
            식단 데이터를 불러오는 데 실패했습니다.
          </p>
        )}
      </div>
    </>
  );
};

export default SurveyResult;
