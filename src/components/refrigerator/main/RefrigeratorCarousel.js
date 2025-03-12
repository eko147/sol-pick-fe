import React, { useState, useRef } from "react";
import "./RefrigeratorCarousel.css";
import RefrigeratorSVGv2 from "./RefrigeratorSVGv2";
import IngredientsShelf from "./IngredientsShelf";

const RefrigeratorCarousel = ({
  refrigeratorHeight,
  allIngredients,
  ingredientsPerFridge = 18, // 한 냉장고당 최대 식재료 수
  onIngredientClick,
  currentPage = 0, // 부모 컴포넌트에서 관리하는 현재 페이지
  onPageChange = () => {}, // 페이지 변경 콜백
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // 식재료를 냉장고별로 그룹화
  const groupIngredientsByFridge = () => {
    const fridges = [];
    const totalIngredients = allIngredients.flat();
    const totalFridges = Math.ceil(
      totalIngredients.length / ingredientsPerFridge
    );

    for (let fridgeIndex = 0; fridgeIndex < totalFridges; fridgeIndex++) {
      const start = fridgeIndex * ingredientsPerFridge;
      const fridgeIngredients = totalIngredients.slice(
        start,
        start + ingredientsPerFridge
      );

      // 각 냉장고의 식재료를 6개 선반으로 분배
      const fridgeContent = [[], [], [], [], [], []];
      for (let i = 0; i < fridgeIngredients.length; i++) {
        const shelfIndex = Math.floor(i / 3); // 각 선반에 3개씩 배치
        if (shelfIndex < 6) {
          fridgeContent[shelfIndex].push({
            ...fridgeIngredients[i],
            x: 70 + (i % 3) * 75, // x 좌표 계산 (70, 145, 220)
          });
        }
      }
      fridges.push(fridgeContent);
    }
    return fridges;
  };

  const fridges = groupIngredientsByFridge();

  // 선반 위치 계산
  const calculateShelfPositions = () => {
    if (!refrigeratorHeight) return null;

    // 원본 SVG에서의 선반 Y 위치들
    const shelfPositionsOriginal = [116, 217, 318, 419, 520, 601];
    const baseHeight = 644; // 원본 SVG 높이

    // 비율에 맞게 선반 위치 조정
    const heightRatio = refrigeratorHeight / baseHeight;
    return shelfPositionsOriginal.map((pos) => Math.round(pos * heightRatio));
  };

  // 식재료 위치 계산
  const calculateIngredientPositions = () => {
    const shelfPositions = calculateShelfPositions();
    if (!shelfPositions) return null;

    // 각 선반 위에 식재료가 놓이도록 계산
    const positions = shelfPositions
      .slice(0, 5)
      .map((shelfPos) => shelfPos - 50 - 12);

    // 바닥 식재료 위치
    positions.push(refrigeratorHeight - 85);

    return positions;
  };

  const ingredientPositions = calculateIngredientPositions();

  // 페이지 이동 함수
  const goToPage = (page) => {
    if (page >= 0 && page < fridges.length) {
      // 부모 컴포넌트에 페이지 변경 알림
      onPageChange(page);
    }
  };

  // 이전 페이지로 이동
  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const nextPage = () => {
    if (currentPage < fridges.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPage();
    } else if (isRightSwipe) {
      prevPage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="v2-refrigerator-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
    >
      <div
        className="v2-refrigerator-slider"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {fridges.map((fridgeContent, fridgeIndex) => (
          <div className="v2-refrigerator-slide" key={`fridge-${fridgeIndex}`}>
            <div className="v2-refrigerator-with-ingredients">
              {/* 냉장고 SVG */}
              <RefrigeratorSVGv2
                height={refrigeratorHeight}
                refrigeratorRef={null}
              />

              {/* 각 선반의 식재료들 */}
              {ingredientPositions &&
                fridgeContent.map((shelfIngredients, shelfIndex) => (
                  <IngredientsShelf
                    key={`shelf-${fridgeIndex}-${shelfIndex}`}
                    shelfIngredients={shelfIngredients}
                    position={ingredientPositions[shelfIndex]}
                    onIngredientClick={onIngredientClick}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefrigeratorCarousel;
