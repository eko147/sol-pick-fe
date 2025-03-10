import React, { useState, useEffect, useRef } from "react";
import "./RefrigeratorMain.css";
import AddPopup from "../../components/refrigerator/AddPopup";
import recipe from "../../assets/recipe.svg";
import Menu from "../../components/common/menu/Menu";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/common/popup/Popup";

import RefrigeratorHeader from "../../components/refrigerator/RefrigeratorHeader";
import RefrigeratorSVG from "../../components/refrigerator/RefrigeratorSVG";
import IngredientsShelf from "../../components/refrigerator/IngredientsShelf";
import IngredientDetailContent from "../../components/refrigerator/IngredientDetailContent";

// 식재료 이미지 import
import bread from "../../assets/ing/ing_bread.svg";
import broccoli from "../../assets/ing/ing_broccoli.svg";
import cherry from "../../assets/ing/ing_cherry.svg";
import croissant from "../../assets/ing/ing_croissant.svg";
import grape from "../../assets/ing/ing_grape.svg";
import leaf from "../../assets/ing/ing_leaf.svg";
import lemon from "../../assets/ing/ing_lemon.svg";
import meat from "../../assets/ing/ing_meat.svg";
import melon from "../../assets/ing/ing_melon.svg";
import orange from "../../assets/ing/ing_orange.svg";
import peach from "../../assets/ing/ing_peach.svg";
import redapple from "../../assets/ing/ing_redapple.svg";
import strawberry from "../../assets/ing/ing_strawberry.svg";
import tomato from "../../assets/ing/ing_tomato.svg";
import watermelon from "../../assets/ing/ing_watermelon.svg";

const RefrigeratorMain = () => {
  // 추가하기 팝업 표시 여부를 관리하는 상태
  const [isAddIngredientPopupOpen, setIsAddIngredientPopupOpen] =
    useState(false);
  const [refrigeratorHeight, setRefrigeratorHeight] = useState(0);
  const refrigeratorRef = useRef(null);

  // 식재료 상세 팝업 표시 여부를 관리하는 상태
  const [isIngredientDetailPopupOpen, setIsIngredientDetailPopupOpen] =
    useState(false);
  const [clickedIngredient, setClickedIngredient] = useState(null);

  // 냉장고 식재료 데이터 (각 선반별로 배열로 구성)
  const [refrigeratorIngredients, setRefrigeratorIngredients] = useState([
    // 1번 선반 (첫 번째 중간 선반)
    [
      { id: 1, name: "사과", image: redapple, x: 70, size: 50 },
      { id: 2, name: "멜론", image: melon, x: 145, size: 50 },
      { id: 3, name: "복숭아", image: peach, x: 220, size: 50 },
    ],
    // 2번 선반
    [
      { id: 4, name: "고기", image: meat, x: 70, size: 50 },
      { id: 5, name: "브로콜리", image: broccoli, x: 145, size: 50 },
      { id: 6, name: "크루아상", image: croissant, x: 220, size: 50 },
    ],
    // 3번 선반
    [
      { id: 7, name: "딸기", image: strawberry, x: 70, size: 50 },
      { id: 8, name: "상추", image: leaf, x: 140, size: 50 },
      { id: 9, name: "포도", image: grape, x: 220, size: 50 },
    ],
    // 4번 선반
    [
      { id: 10, name: "수박", image: watermelon, x: 70, size: 50 },
      { id: 11, name: "체리", image: cherry, x: 145, size: 50 },
      { id: 12, name: "빵", image: bread, x: 220, size: 50 },
    ],
    // 5번 선반 (바닥 선반)
    [
      { id: 13, name: "레몬", image: lemon, x: 70, size: 50 },
      { id: 14, name: "토마토", image: tomato, x: 145, size: 50 },
      { id: 15, name: "오렌지", image: orange, x: 220, size: 50 },
    ],
  ]);

  // 화면 크기에 따라 냉장고 크기 조정
  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const headerElement = document.querySelector(
        ".refrigerator-header-container"
      );

      const headerHeight = headerElement ? headerElement.offsetHeight : 72;
      const menuHeight = 88; // 메뉴 높이 88px로 고정
      const topSpacing = 12; // 헤더 아래 간격
      const bottomSpacing = 12; // 메뉴 위 간격

      // 냉장고 높이 = 전체 화면 - (헤더 + 메뉴 + 상하 간격)
      const availableHeight =
        windowHeight - (headerHeight + menuHeight + topSpacing + bottomSpacing);

      // 최소 높이는 300px로 설정
      const height = Math.max(300, availableHeight);
      setRefrigeratorHeight(height);
    };

    // 초기 계산 및 창 크기 변경 시 대응
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  // 선반 위치 계산 - 맨 밑 5개 선반만 사용
  const calculateShelfPositions = () => {
    if (!refrigeratorHeight) return null;

    const baseHeight = 644; // 원본 SVG 높이
    const heightRatio = refrigeratorHeight / baseHeight;

    // 원본 SVG에서의 선반 Y 위치들 (중간 선반들)
    const middleShelfPositions = [136, 257, 378, 499].map((pos) =>
      Math.round(pos * heightRatio)
    );

    // 바닥 선반 위치 추가 (냉장고 바닥)
    const bottomShelfPosition = refrigeratorHeight - 25;

    // 맨 밑 5개 선반 위치 반환
    return [...middleShelfPositions, bottomShelfPosition];
  };

  const navigate = useNavigate();

  // 이벤트 핸들러들
  const openAddIngredientPopup = () => {
    setIsAddIngredientPopupOpen(true);
  };

  const closeAddIngredientPopup = () => {
    setIsAddIngredientPopupOpen(false);
  };

  const openIngredientDetailPopup = (ingredient) => {
    setClickedIngredient(ingredient);
    setIsIngredientDetailPopupOpen(true);
  };

  const closeIngredientDetailPopup = () => {
    setIsIngredientDetailPopupOpen(false);
  };

  const navigateToRecipe = () => {
    // 레시피 페이지로 이동하는 로직
  };

  const navigateToIngredientList = () => {
    navigate("/ingredientdetaillist");
  };

  // 선반 위치 계산
  const shelfPositions = calculateShelfPositions();

  // 식재료 위치 계산 - 각 선반 위에 놓이도록
  const calculateIngredientPositions = () => {
    if (!shelfPositions) return null;

    // 각 선반 위에 식재료가 놓이도록 계산하고 12px 위로 더 이동
    return shelfPositions.map((shelfPos) => shelfPos - 50 - 12);
  };

  const ingredientPositions = calculateIngredientPositions();

  // 총 식재료 수 계산
  const totalIngredients = refrigeratorIngredients.reduce(
    (total, shelf) => total + shelf.length,
    0
  );

  return (
    <div className="refrigerator-container">
      {/* 냉장고 헤더 컴포넌트 */}
      <RefrigeratorHeader
        totalIngredients={totalIngredients}
        onAddClick={openAddIngredientPopup}
        onDetailClick={navigateToIngredientList}
      />

      <div className="refrigerator-illustration-container">
        {refrigeratorHeight > 0 ? (
          <div className="refrigerator-with-ingredients">
            {/* 냉장고 SVG 컴포넌트 */}
            <RefrigeratorSVG
              height={refrigeratorHeight}
              shelfPositions={shelfPositions}
              refrigeratorRef={refrigeratorRef}
            />

            {/* 각 선반의 식재료들 */}
            {ingredientPositions &&
              refrigeratorIngredients.map((shelfIngredients, shelfIndex) => (
                <IngredientsShelf
                  key={`shelf-${shelfIndex}`}
                  shelfIngredients={shelfIngredients}
                  position={ingredientPositions[shelfIndex]}
                  onIngredientClick={openIngredientDetailPopup}
                />
              ))}
          </div>
        ) : null}
      </div>

      <div className="recipe-button" onClick={navigateToRecipe}>
        <img src={recipe} alt="recipe" className="recipe-icon" />
      </div>

      {/* 추가하기 팝업 */}
      <AddPopup
        isOpen={isAddIngredientPopupOpen}
        onClose={closeAddIngredientPopup}
      />

      {/* 식재료 상세 정보 팝업 */}
      <Popup
        isOpen={isIngredientDetailPopupOpen}
        onClose={closeIngredientDetailPopup}
        title={clickedIngredient ? clickedIngredient.name : "식재료명"}
        outlinedButtonText="수정하기"
        filledButtonText="삭제하기"
      >
        <IngredientDetailContent ingredient={clickedIngredient} />
      </Popup>

      <Menu />
    </div>
  );
};

export default RefrigeratorMain;
