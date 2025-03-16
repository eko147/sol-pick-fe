import React, { useState, useEffect } from "react";
import "./LevelStatus.css";
import { getSelectedRecipe } from "../../utils/game/storageUtils";
import recipes from "./RecipeData";

/**
 * 캐릭터의 레벨과 경험치 정보를 표시하는 카드 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {number} props.level - 현재 레벨 (기본값: 3)
 * @param {number} props.currentExp - 현재 경험치 (기본값: 270)
 * @param {number} props.energy - 현재 에너지 (기본값: 100)
 * @param {number} props.food - 보유한 사료 개수 (기본값: 10)
 * @param {number} props.ingredients - 보유한 식재료 개수 (기본값: 0)
 * @param {Function} props.onFeed - 밥 주기 버튼 클릭 핸들러
 * @param {Function} props.onExplore - 탐색하기 버튼 클릭 핸들러
 * @returns {JSX.Element} 레벨 상태 카드 컴포넌트
 */
const LevelStatus = ({
  level = 3,
  currentExp = 270,
  energy = 100,
  food = 10,
  ingredients = 0,
  onFeed,
  onExplore,
}) => {
  // 선택한 레시피 상태 추가
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 컴포넌트 마운트 시 사용자 레시피 불러오기
  useEffect(() => {
    // 로컬 스토리지에서 선택된 레시피 ID 불러오기
    const recipeId = getSelectedRecipe();
    console.log("Selected Recipe ID:", recipeId);
    console.log("Available Recipes:", recipes);

    if (recipeId) {
      // 레시피 ID로 해당 레시피 객체 찾기
      const recipe = recipes.find((r) => r.id === recipeId);
      console.log("Found Recipe:", recipe);

      if (recipe) {
        setSelectedRecipe(recipe);
        console.log("Recipe Image Path:", recipe.imagePath);
      }
    }
  }, []);

  // 레벨에 따른 설정 구성
  const levelConfig = {
    1: { totalExp: 100, foodRatio: 90, ingredientRatio: 10 },
    2: { totalExp: 200, foodRatio: 80, ingredientRatio: 20 },
    3: { totalExp: 300, foodRatio: 70, ingredientRatio: 30 },
    4: { totalExp: 400, foodRatio: 60, ingredientRatio: 40 },
    5: { totalExp: 500, foodRatio: 50, ingredientRatio: 50 },
  };

  // 현재 레벨 설정 가져오기
  const config = levelConfig[level] || levelConfig[1];

  // 경험치 퍼센트 계산
  const expPercentage = Math.min(
    (currentExp / config.totalExp) * 100,
    100
  ).toFixed(1);

  // 픽셀 버튼 컴포넌트 (내부로 통합)
  const PixelButton = ({ children, onClick }) => {
    return (
      <div className="pixel-button-wrapper">
        <div className="pixel-button-shadow"></div>
        <button className="pixel-button" onClick={onClick}>
          {children}
        </button>
      </div>
    );
  };

  return (
    <div className="level-status-container">
      <div className="character-section">
        {/* 선택한 레시피 이미지 */}
        <div className="recipe-image">
          {selectedRecipe && (
            <img
              src={selectedRecipe.imagePath}
              alt={selectedRecipe.name}
              className="recipe-img"
            />
          )}
        </div>

        <div className="info-section">
          {/* 레벨 표시 및 정보 */}
          <div className="level-info-row">
            <div className="level-badge pixel-font-kr">레벨{level}</div>
            <div className="level-text pixel-font-kr">
              식재료 확률{" "}
              <span className="highlight pixel-font-kr">{level}배</span>{" "}
              <span className="emoji-up">🆙</span>
            </div>
          </div>

          {/* 경험치 바 */}
          <div className="exp-bar-container">
            <div
              className="exp-bar-fill"
              style={{ width: `${expPercentage}%` }}
            ></div>
            <div className="exp-percentage pixel-font-kr">{expPercentage}%</div>
          </div>
        </div>
      </div>

      {/* 상태 통계 */}
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-label">경험치🧪</div>
          <div className="stat-value">
            {currentExp}/{config.totalExp}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">에너지🍭</div>
          <div className="stat-value">{energy}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">사료🐟</div>
          <div className="stat-value"> {food}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">식재료🥕</div>
          <div className="stat-value">{ingredients}</div>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="buttons-container">
        <PixelButton onClick={onFeed}>
          <p className="pixel-font-kr">밥 주기</p>
          <p className="food-qty">🐟 X 1</p>
        </PixelButton>
        <PixelButton onClick={onExplore}>
          <p className="pixel-font-kr">탐색하기</p>
          <p className="energy-consume">🍭 X 50</p>
        </PixelButton>
      </div>
    </div>
  );
};

export default LevelStatus;
