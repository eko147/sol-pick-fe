import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";
import backArrow from "../../../assets/backArrow.svg";
import Header from "../../../components/common/header/Header";
import Menu from "../../../components/common/menu/Menu";

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <p>레시피 정보를 불러올 수 없습니다.</p>;
  }

  // 난이도 표시를 한글로 변환
  const getDifficultyText = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "쉬움";
      case "medium":
        return "보통";
      case "hard":
        return "어려움";
      default:
        return difficulty || "알 수 없음";
    }
  };

  return (
    <>
      <Header
        leftIcon={backArrow}
        title={recipe.name}
        onLeftClick={() => navigate(-1)}
      />
      <div className="recipe-detail-container">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-detail-image"
        />

        {/* 조리 정보 박스형 UI */}
        <div className="recipe-info-container">
          <div className="recipe-info-box">
            <div className="recipe-info-icon">⏳</div>
            <div className="recipe-info-label">조리 시간</div>
            <div className="recipe-info-value">
              {recipe.cooking_time || "알 수 없음"}
            </div>
          </div>

          <div className="recipe-info-box">
            <div className="recipe-info-icon">🔥</div>
            <div className="recipe-info-label">난이도</div>
            <div className="recipe-info-value">
              {getDifficultyText(recipe.difficulty)}
            </div>
          </div>
        </div>

        <h2 className="recipe-section-title">🥕 필요한 재료</h2>
        <ul className="recipe-ingredient-list">
          {recipe.ingredients.split(", ").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="recipe-section-title">👨‍🍳 조리 방법</h2>
        <ol className="recipe-cooking-steps">
          {Array.isArray(recipe.steps) ? (
            recipe.steps.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <p>❌ 조리 방법 정보가 없습니다.</p>
          )}
        </ol>
      </div>
    </>
  );
};

export default RecipeDetail;
