import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MealDetail.css"; // ✅ 스타일 파일 추가
import Header from "../../components/common/header/Header";
import backArrow from "../../assets/backArrow.svg";
import Menu from "../../components/common/menu/Menu";
import MainHeader from "../../components/common/header/MainHeader";
import Main from "./Main";
const MealDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meal = location.state?.meal;

  return (
    <>
      <MainHeader />
      <Header
        leftIcon={backArrow}
        title="식단 정보" // ✅ 레시피 제목
        onLeftClick={() => navigate(-1)}
      />
      <div className="meal-detail-container">
        <h2 className="meal-title">{meal.menu}</h2>

        {/* ✅ 칼로리 정보 */}
        <p className="meal-calories">칼로리: {meal.calories} kcal</p>

        {/* ✅ 재료 목록 */}
        <h3>📌 필요한 재료</h3>
        <ul className="ingredient-list">
          {meal.ingredients && meal.ingredients.length > 0 ? (
            meal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <p>❌ 재료 정보가 없습니다.</p>
          )}
        </ul>

        {/* ✅ 조리 과정 */}
        <h3>👨‍🍳 조리 방법</h3>
        <ol className="cooking-steps">
          {meal.steps && meal.steps.length > 0 ? (
            meal.steps.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <p>❌ 조리 방법 정보가 없습니다.</p>
          )}
        </ol>
      </div>
      <Menu />
    </>
  );
};

export default MealDetail;
