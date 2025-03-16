import React from "react";
import "./DiscoveredIngredients.css";
import discoveredIng from "../../assets/game/discoverdIng.svg";

/**
 * 발견한 식재료 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {number} props.discoveredCount - 발견한 식재료 개수
 * @param {number} props.totalCount - 전체 식재료 개수
 * @param {Array} props.ingredients - 식재료 목록 (발견/미발견 상태 포함)
 * @returns {JSX.Element} 발견한 식재료 컴포넌트
 */
const DiscoveredIngredients = ({ ingredients = [] }) => {
  // 식재료 아이콘을 렌더링하는 함수
  const renderIngredientIcon = (ingredient, index) => {
    return (
      <div
        key={index}
        className={`ingredient-icon ${
          ingredient.discovered ? "discovered" : "undiscovered"
        }`}
        title={ingredient.name}
      >
        <div className="ingredient-image">
          {ingredient.discovered ? (
            <img src={ingredient.icon} alt={ingredient.name} />
          ) : (
            <div className="locked-icon">?</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="discovered-ingredients-container">
      {/* 발견한 식재료 헤더 */}
      <div className="discovered-header">
        <div className="discovered-title">
          <img
            src={discoveredIng}
            alt="Discovered Ingredients"
            className="discovered-ing-icon"
          ></img>
          <span className="title-text pixel-font-kr">발견한 식재료</span>
        </div>
        <hr className="discovered-ing-divider"></hr>
      </div>

      {/* 식재료 아이콘 그리드 */}
      <div className="ingredient-grid">
        {ingredients.map((ingredient, index) =>
          renderIngredientIcon(ingredient, index)
        )}
      </div>
    </div>
  );
};

export default DiscoveredIngredients;
