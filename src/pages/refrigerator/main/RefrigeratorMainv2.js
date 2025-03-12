import React, { useState, useEffect, useRef } from "react";
import "./RefrigeratorMainv2.css";
import AddPopup from "../../../components/refrigerator/popup/AddPopup";
import recipe from "../../../assets/recipe.svg";
import Menu from "../../../components/common/menu/Menu";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/common/popup/Popup";

// 기존 RefrigeratorHeader 사용 - 실제 프로젝트에서는 고유 컴포넌트 생성 고려
import RefrigeratorHeader from "../../../components/refrigerator/main/RefrigeratorHeader";
import RefrigeratorCarousel from "../../../components/refrigerator/main/RefrigeratorCarousel";
import IngredientDetailContent from "../../../components/refrigerator/popup/IngredientDetailContent";

// 식재료 이미지 import
import bread from "../../../assets/ing/ing_bread.svg";
import broccoli from "../../../assets/ing/ing_broccoli.svg";
import cherry from "../../../assets/ing/ing_cherry.svg";
import croissant from "../../../assets/ing/ing_croissant.svg";
import grape from "../../../assets/ing/ing_grape.svg";
import leaf from "../../../assets/ing/ing_leaf.svg";
import lemon from "../../../assets/ing/ing_lemon.svg";
import meat from "../../../assets/ing/ing_meat.svg";
import melon from "../../../assets/ing/ing_melon.svg";
import orange from "../../../assets/ing/ing_orange.svg";
import peach from "../../../assets/ing/ing_peach.svg";
import redapple from "../../../assets/ing/ing_redapple.svg";
import strawberry from "../../../assets/ing/ing_strawberry.svg";
import tomato from "../../../assets/ing/ing_tomato.svg";
import watermelon from "../../../assets/ing/ing_watermelon.svg";

const RefrigeratorMain2WithCarousel = () => {
  // 추가하기 팝업 표시 여부를 관리하는 상태
  const [isAddIngredientPopupOpen, setIsAddIngredientPopupOpen] =
    useState(false);
  const [refrigeratorHeight, setRefrigeratorHeight] = useState(644); // 기본 높이로 설정
  const refrigeratorRef = useRef(null);

  // 식재료 상세 팝업 표시 여부를 관리하는 상태
  const [isIngredientDetailPopupOpen, setIsIngredientDetailPopupOpen] =
    useState(false);
  const [clickedIngredient, setClickedIngredient] = useState(null);

  // 냉장고 식재료 데이터 (여러 냉장고 분량)
  const [allIngredients, setAllIngredients] = useState([
    // 첫 번째 냉장고 식재료
    [
      { id: 1, name: "사과", image: redapple, size: 50 },
      { id: 2, name: "멜론", image: melon, size: 50 },
      { id: 3, name: "복숭아", image: peach, size: 50 },
      { id: 4, name: "고기", image: meat, size: 50 },
      { id: 5, name: "브로콜리", image: broccoli, size: 50 },
      { id: 6, name: "크루아상", image: croissant, size: 50 },
      { id: 7, name: "레몬", image: lemon, size: 50 },
      { id: 8, name: "토마토", image: tomato, size: 50 },
      { id: 9, name: "오렌지", image: orange, size: 50 },
      { id: 10, name: "딸기", image: strawberry, size: 50 },
      { id: 11, name: "상추", image: leaf, size: 50 },
      { id: 12, name: "포도", image: grape, size: 50 },
      { id: 13, name: "수박", image: watermelon, size: 50 },
      { id: 14, name: "체리", image: cherry, size: 50 },
      { id: 15, name: "빵", image: bread, size: 50 },
      { id: 16, name: "레몬", image: lemon, size: 50 },
      { id: 17, name: "토마토", image: tomato, size: 50 },
      { id: 18, name: "오렌지", image: orange, size: 50 },
    ],
    // 두 번째 냉장고 식재료
    [
      { id: 19, name: "사과", image: redapple, size: 50 },
      { id: 20, name: "멜론", image: melon, size: 50 },
      { id: 21, name: "복숭아", image: peach, size: 50 },
      { id: 22, name: "고기", image: meat, size: 50 },
      { id: 23, name: "브로콜리", image: broccoli, size: 50 },
      { id: 24, name: "크루아상", image: croissant, size: 50 },
      { id: 25, name: "레몬", image: lemon, size: 50 },
      { id: 26, name: "토마토", image: tomato, size: 50 },
      { id: 27, name: "오렌지", image: orange, size: 50 },
    ],
    // 세 번째 냉장고 식재료
    [
      { id: 28, name: "사과", image: redapple, size: 50 },
      { id: 29, name: "멜론", image: melon, size: 50 },
      { id: 30, name: "복숭아", image: peach, size: 50 },
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

  // 총 식재료 수 계산
  const totalIngredients = allIngredients.flat().length;

  // 새 식재료 추가 함수 (필요시 사용)
  const addNewIngredient = (newIngredient) => {
    // 마지막 냉장고에 식재료 추가
    setAllIngredients((prev) => {
      const newIngredients = [...prev];
      const lastFridgeIndex = newIngredients.length - 1;

      // 마지막 냉장고가 가득 찼는지 확인 (각 냉장고는 최대 18개)
      if (newIngredients[lastFridgeIndex].length >= 18) {
        // 새 냉장고 추가
        newIngredients.push([newIngredient]);
      } else {
        // 기존 냉장고에 추가
        newIngredients[lastFridgeIndex] = [
          ...newIngredients[lastFridgeIndex],
          newIngredient,
        ];
      }

      return newIngredients;
    });
  };

  return (
    <div className="v2-refrigerator-container">
      {/* 냉장고 헤더 컴포넌트 */}
      <RefrigeratorHeader
        totalIngredients={totalIngredients}
        onAddClick={openAddIngredientPopup}
        onDetailClick={navigateToIngredientList}
      />

      <div className="v2-illustration-container-wrapper">
        <div className="v2-refrigerator-illustration-container">
          {refrigeratorHeight > 0 && (
            <RefrigeratorCarousel
              refrigeratorHeight={refrigeratorHeight}
              allIngredients={allIngredients}
              onIngredientClick={openIngredientDetailPopup}
            />
          )}
        </div>
      </div>

      <div className="v2-recipe-button" onClick={navigateToRecipe}>
        <img src={recipe} alt="recipe" className="v2-recipe-icon" />
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

export default RefrigeratorMain2WithCarousel;
