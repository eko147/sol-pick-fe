import React, { useState, useEffect, useRef } from "react";
import "./RefrigeratorMainv2.css";
import AddPopup from "../../../components/refrigerator/popup/AddPopup";
import recipe from "../../../assets/recipe.svg";
import Menu from "../../../components/common/menu/Menu";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/common/popup/Popup";

// 기존 RefrigeratorHeader 사용
import RefrigeratorHeader from "../../../components/refrigerator/main/RefrigeratorHeader";
import RefrigeratorCarousel from "../../../components/refrigerator/main/RefrigeratorCarousel";
import IngredientDetailContent from "../../../components/refrigerator/popup/IngredientDetailContent";

import { getIngredientImageFromEmoji } from "../../../utils/emojiToImageMap";

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

  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);

  // 냉장고 식재료 데이터 (여러 냉장고 분량)
  const [allIngredients, setAllIngredients] = useState([
    [
      {
        id: 1,
        name: "사과",
        emoji: "🍎",
        image: getIngredientImageFromEmoji("🍎"),
        size: 50,
      },
      {
        id: 2,
        name: "바나나",
        emoji: "🍌",
        image: getIngredientImageFromEmoji("🍌"),
        size: 50,
      },
      {
        id: 3,
        name: "복숭아",
        emoji: "🍑",
        image: getIngredientImageFromEmoji("🍑"),
        size: 50,
      },
      {
        id: 4,
        name: "고기",
        emoji: "🥩",
        image: getIngredientImageFromEmoji("🥩"),
        size: 50,
      },
      {
        id: 5,
        name: "브로콜리",
        emoji: "🥦",
        image: getIngredientImageFromEmoji("🥦"),
        size: 50,
      },
      {
        id: 6,
        name: "우유",
        emoji: "🥛",
        image: getIngredientImageFromEmoji("🥛"),
        size: 50,
      },
      {
        id: 7,
        name: "키위",
        emoji: "🥝",
        image: getIngredientImageFromEmoji("🥝"),
        size: 50,
      },
      {
        id: 8,
        name: "토마토",
        emoji: "🍅",
        image: getIngredientImageFromEmoji("🍅"),
        size: 50,
      },
      {
        id: 9,
        name: "옥수수",
        emoji: "🌽",
        image: getIngredientImageFromEmoji("🌽"),
        size: 50,
      },
      {
        id: 10,
        name: "딸기",
        emoji: "🍓",
        image: getIngredientImageFromEmoji("🍓"),
        size: 50,
      },
      {
        id: 11,
        name: "상추",
        emoji: "🥬",
        image: getIngredientImageFromEmoji("🥬"),
        size: 50,
      },
      {
        id: 12,
        name: "포도",
        emoji: "🍇",
        image: getIngredientImageFromEmoji("🍇"),
        size: 50,
      },
      {
        id: 13,
        name: "수박",
        emoji: "🍉",
        image: getIngredientImageFromEmoji("🍉"),
        size: 50,
      },
      {
        id: 14,
        name: "체리",
        emoji: "🍒",
        image: getIngredientImageFromEmoji("🍒"),
        size: 50,
      },
      {
        id: 15,
        name: "감자",
        emoji: "🥔",
        image: getIngredientImageFromEmoji("🥔"),
        size: 50,
      },
      {
        id: 16,
        name: "버섯",
        emoji: "🍄",
        image: getIngredientImageFromEmoji("🍄"),
        size: 50,
      },
      {
        id: 17,
        name: "아보카도",
        emoji: "🥑",
        image: getIngredientImageFromEmoji("🥑"),
        size: 50,
      },
      {
        id: 18,
        name: "오렌지",
        emoji: "🍊",
        image: getIngredientImageFromEmoji("🍊"),
        size: 50,
      },
    ],
    [
      {
        id: 19,
        name: "코코넛",
        emoji: "🥥",
        image: getIngredientImageFromEmoji("🥥"),
        size: 50,
      },
      {
        id: 20,
        name: "멜론",
        emoji: "🍈",
        image: getIngredientImageFromEmoji("🍈"),
        size: 50,
      },
      {
        id: 21,
        name: "사과",
        emoji: "🍏",
        image: getIngredientImageFromEmoji("🍏"),
        size: 50,
      },
      {
        id: 22,
        name: "닭다리",
        emoji: "🍗",
        image: getIngredientImageFromEmoji("🍗"),
        size: 50,
      },
      {
        id: 23,
        name: "땅콩",
        emoji: "🥜",
        image: getIngredientImageFromEmoji("🥜"),
        size: 50,
      },
      {
        id: 24,
        name: "열대어",
        emoji: "🐠",
        image: getIngredientImageFromEmoji("🐠"),
        size: 50,
      },
      {
        id: 25,
        name: "당근",
        emoji: "🥕",
        image: getIngredientImageFromEmoji("🥕"),
        size: 50,
      },
      {
        id: 26,
        name: "팬케이크",
        emoji: "🥞",
        image: getIngredientImageFromEmoji("🥞"),
        size: 50,
      },
      {
        id: 27,
        name: "푸딩",
        emoji: "🍮",
        image: getIngredientImageFromEmoji("🍮"),
        size: 50,
      },
      {
        id: 28,
        name: "아이스크림",
        emoji: "🍦",
        image: getIngredientImageFromEmoji("🍦"),
        size: 50,
      },
      {
        id: 29,
        name: "달걀",
        emoji: "🥚",
        image: getIngredientImageFromEmoji("🥚"),
        size: 50,
      },
      {
        id: 30,
        name: "포도",
        emoji: "🍇",
        image: getIngredientImageFromEmoji("🍇"),
        size: 50,
      },
      {
        id: 31,
        name: "수박",
        emoji: "🍉",
        image: getIngredientImageFromEmoji("🍉"),
        size: 50,
      },
      {
        id: 32,
        name: "프레첼",
        emoji: "🥨",
        image: getIngredientImageFromEmoji("🥨"),
        size: 50,
      },
      {
        id: 33,
        name: "샐러드",
        emoji: "🥗",
        image: getIngredientImageFromEmoji("🥗"),
        size: 50,
      },
      {
        id: 34,
        name: "레몬",
        emoji: "🍋",
        image: getIngredientImageFromEmoji("🍋"),
        size: 50,
      },
      {
        id: 35,
        name: "새우튀김",
        emoji: "🍤",
        image: getIngredientImageFromEmoji("🍤"),
        size: 50,
      },
      {
        id: 36,
        name: "고구마",
        emoji: "🍠",
        image: getIngredientImageFromEmoji("🍠"),
        size: 50,
      },
    ],
    [
      {
        id: 37,
        name: "밤",
        emoji: "🌰",
        image: getIngredientImageFromEmoji("🌰"),
        size: 50,
      },
      {
        id: 38,
        name: "바게트",
        emoji: "🥖",
        image: getIngredientImageFromEmoji("🥖"),
        size: 50,
      },
      {
        id: 39,
        name: "파인애플",
        emoji: "🍍",
        image: getIngredientImageFromEmoji("🍍"),
        size: 50,
      },
      {
        id: 40,
        name: "롤리팝",
        emoji: "🍭",
        image: getIngredientImageFromEmoji("🍭"),
        size: 50,
      },
      {
        id: 41,
        name: "치즈",
        emoji: "🧀",
        image: getIngredientImageFromEmoji("🧀"),
        size: 50,
      },
      {
        id: 42,
        name: "버터",
        emoji: "🧈",
        image: getIngredientImageFromEmoji("🧈"),
        size: 50,
      },
      {
        id: 43,
        name: "도넛",
        emoji: "🍩",
        image: getIngredientImageFromEmoji("🍩"),
        size: 50,
      },
      {
        id: 44,
        name: "컵케이크",
        emoji: "🧁",
        image: getIngredientImageFromEmoji("🧁"),
        size: 50,
      },
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
    navigate("/recipe-loading");
    // 레시피 페이지로 이동하는 로직
  };

  const navigateToIngredientList = () => {
    navigate("/ingredientdetaillist");
  };

  // 총 식재료 수 계산
  const totalIngredients = allIngredients.flat().length;

  // 페이지 변경 핸들러
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
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
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* 인디케이터를 캐러셀 밖으로 빼서 직접 추가 */}
      <div className="v2-refrigerator-indicators">
        {allIngredients.map((_, index) => (
          <div
            key={`main-indicator-${index}`}
            className={`v2-refrigerator-indicator ${
              index === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(index)}
          />
        ))}
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
