import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MealDetail.css";
import Header from "../../components/common/header/Header";
import backArrow from "../../assets/backArrow.svg";
import Menu from "../../components/common/menu/Menu";

const MealDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meal = location.state?.meal;

  if (!meal) {
    return (
      <>
        <Header
          leftIcon={backArrow}
          title="식단 정보"
          onLeftClick={() => navigate(-1)}
        />
        <div className="meal-detail-container">
          <p className="meal-no-data">식단 정보를 불러올 수 없습니다.</p>
        </div>
        <Menu />
      </>
    );
  }

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="식단 정보"
        onLeftClick={() => navigate(-1)}
      />
      <div className="meal-detail-container">
        <h2 className="meal-title">{meal.menu}</h2>
        <p className="meal-calories">칼로리: {meal.calories} kcal</p>

        <h2 className="meal-section-title">🥕 필요한 재료</h2>
        <ul className="meal-ingredient-list">
          {meal.ingredients && meal.ingredients.length > 0 ? (
            meal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <p className="meal-no-data">재료 정보가 없습니다.</p>
          )}
        </ul>

        <h2 className="meal-section-title">👨‍🍳 조리 방법</h2>
        <ol className="meal-cooking-steps">
          {meal.steps && meal.steps.length > 0 ? (
            meal.steps.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <p className="meal-no-data">조리 방법 정보가 없습니다.</p>
          )}
        </ol>
      </div>
    </>
  );
};

export default MealDetail;
