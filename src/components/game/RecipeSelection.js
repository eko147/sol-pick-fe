import React, { useState } from "react";
import "./RecipeSelection.css";
import RecipeCard from "./RecipeCard";

const RecipeSelection = ({ onNext }) => {
  // 레시피 배열 (실제로는 API로부터 받아올 수 있음)
  const recipes = [
    { id: 1, name: "레시피 1" },
    { id: 2, name: "레시피 2" },
    { id: 3, name: "레시피 3" },
    { id: 4, name: "레시피 4" },
    { id: 5, name: "레시피 5" },
    { id: 6, name: "레시피 6" },
  ];

  // 선택된 레시피 ID 상태
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // 레시피 선택 핸들러
  const handleSelectRecipe = (recipeId) => {
    console.log("Selected recipe:", recipeId);
    setSelectedRecipeId(recipeId);
  };

  return (
    <div className="recipe-selection-container">
      <div className="recipe-selection-content">
        <div className="recipe-title-container">
          <h2 className="recipe-title">받고 싶은 레시피를 골라주세요</h2>
          <p className="recipe-description">
            레시피에 맞게 최적의 혜택을 주는 포인트가 쌓여요
          </p>
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              selected={recipe.id === selectedRecipeId}
              onClick={() => handleSelectRecipe(recipe.id)}
            />
          ))}
        </div>

        <div className="help-section">
          <button className="help-button">
            <span>[필수] 개인 정보 수집 및 이용 동의</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="#888888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <button
          className="recipe-continue-button"
          onClick={onNext}
          disabled={selectedRecipeId === null}
        >
          동의하고 시작하기
        </button>
      </div>
    </div>
  );
};

export default RecipeSelection;
