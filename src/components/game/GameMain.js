import React, { useState, useEffect } from "react";

import "./GameMain.css";
import GameBackground from "./GameBackground";
import catPlayground from "../../assets/game/catPlayground.svg";
import dailyGame from "../../assets/game/dailyGame.svg";
import storage from "../../assets/game/storage.svg";
import LevelStatus from "./LevelStatus";
import DiscoveredIngredients from "./DiscoveredIngredients";
import { IngredientIcons } from "./IngredientIcons";
import PixelModal from "./PixelModal";

/**
 * 게임 메인 화면 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onNext - 다음 화면으로 이동하는 함수
 * @returns {JSX.Element} 게임 메인 화면
 */
const GameMain = ({ onDailyGame, onStorage }) => {
  // 캐릭터 상태 관리를 위한 state
  const [level, setLevel] = useState(3); // 기본 레벨 3
  const [currentExp, setCurrentExp] = useState(270); // 현재 경험치
  const [energy, setEnergy] = useState(100); // 현재 에너지
  const [food, setFood] = useState(10); // 보유한 사료 개수
  const [ingredients, setIngredients] = useState(0); // 보유한 식재료 개수

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: [],
  });

  // 모달 닫기 함수
  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      title: "",
      message: "",
      buttons: [],
    });
  };

  // 발견한 식재료 데이터 관리
  const [discoveredIngredients, setDiscoveredIngredients] = useState({
    discovered: 10,
    total: 25,
    items: [],
  });

  // 컴포넌트 마운트 시 기본 식재료 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출이나 로컬 스토리지에서 데이터를 가져올 수 있음
    const initialItems = [
      // 발견한 식재료 예시 (실제 앱에서는 동적으로 생성)
      { id: 1, name: "당근", discovered: true, icon: IngredientIcons.carrot },
      { id: 2, name: "양파", discovered: true, icon: IngredientIcons.onion },
      { id: 3, name: "감자", discovered: true, icon: IngredientIcons.potato },
      { id: 4, name: "토마토", discovered: true, icon: IngredientIcons.tomato },
      { id: 5, name: "오이", discovered: true, icon: IngredientIcons.cucumber },
      {
        id: 6,
        name: "브로콜리",
        discovered: true,
        icon: IngredientIcons.broccoli,
      },
      { id: 7, name: "고기", discovered: true, icon: IngredientIcons.meat },
      { id: 8, name: "생선", discovered: true, icon: IngredientIcons.fish },
      { id: 9, name: "치즈", discovered: true, icon: IngredientIcons.cheese },
      { id: 10, name: "계란", discovered: true, icon: IngredientIcons.egg },
      // 미발견 식재료 예시
      ...Array(15)
        .fill()
        .map((_, i) => ({
          id: 11 + i,
          name: "미발견",
          discovered: false,
          icon: "",
        })),
    ];

    setDiscoveredIngredients({
      discovered: 10,
      total: 25,
      items: initialItems,
    });
  }, []);

  /**
   * 밥 주기 기능: 사료를 소모하여 경험치와 에너지 증가
   */
  const feedCat = () => {
    // 사료 확인
    if (food < 1) {
      setModalConfig({
        isOpen: true,
        title: "사료 부족",
        message: "사료가 부족합니다!",
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
      return;
    }

    // 레벨별 최대 경험치 설정
    const maxExp = level * 100;

    // 사료 주기 (경험치 10 증가, 에너지 100 증가)
    const expGain = 10;
    const energyGain = 100;

    // 사료 차감
    setFood((prev) => prev - 1);

    // 에너지 증가
    setEnergy((prev) => prev + energyGain);

    // 경험치 처리 및 레벨업 체크
    let isLevelUp = false;
    let newLevel = level;

    if (currentExp + expGain >= maxExp) {
      // 레벨 업 가능 여부 확인
      if (level < 5) {
        isLevelUp = true;
        newLevel = level + 1;

        // 상태 업데이트: 레벨 증가, 경험치 초기화
        setLevel(newLevel);
        setCurrentExp(0);
      } else {
        // 최대 레벨인 경우 최대 경험치로 고정
        setCurrentExp(maxExp);
      }
    } else {
      // 경험치 추가
      setCurrentExp((prev) => prev + expGain);
    }

    // 먼저 밥 주기 성공 모달 표시
    setModalConfig({
      isOpen: true,
      title: "밥 주기 성공",
      message: `사료를 주었습니다!\n에너지 ${energyGain} 증가\n경험치 ${expGain} 증가`,
      buttons: [
        {
          text: "확인",
          onClick: () => {
            closeModal();

            // 밥 주기 모달 닫은 후 레벨업 모달 표시 (레벨업 발생한 경우)
            if (isLevelUp) {
              setTimeout(() => {
                setModalConfig({
                  isOpen: true,
                  title: "Level Up",
                  message: `축하합니다!\n레벨 ${newLevel}로 성장했습니다!`,
                  buttons: [
                    {
                      text: "확인",
                      onClick: () => closeModal(),
                      type: "primary",
                    },
                  ],
                });
              }, 300); // 모달 전환 시 약간의 딜레이 추가
            } else if (level >= 5 && currentExp + expGain >= maxExp) {
              // 최대 레벨에 도달한 경우 알림
              setTimeout(() => {
                setModalConfig({
                  isOpen: true,
                  title: "최대 레벨",
                  message: "이미 최대 레벨에 도달했습니다!",
                  buttons: [
                    {
                      text: "확인",
                      onClick: () => closeModal(),
                      type: "primary",
                    },
                  ],
                });
              }, 300);
            }
          },
          type: "primary",
        },
      ],
    });
  };
  /**
   * 탐색하기 기능: 에너지를 소모하여 식재료 또는 사료 획득
   */
  const exploreIngredients = () => {
    // 에너지 확인 (탐색에는 에너지 50 필요)
    if (energy < 50) {
      setModalConfig({
        isOpen: true,
        title: "에너지 부족",
        message: "탐색을 위한 에너지가 부족합니다!",
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
      return;
    }

    // 에너지 소모
    setEnergy((prev) => prev - 50);

    // 경험치 증가
    setCurrentExp((prev) => prev + 20);

    // 레벨별 식재료 획득 확률 (레벨이 높을수록 식재료를 얻을 확률 증가)
    // 레벨1은 식재료 확률 10%, 레벨이 올라갈수록 확률이 배수로 증가
    const levelConfig = {
      1: { foodRatio: 90, ingredientRatio: 10 }, // 식재료 확률 1배(10%)
      2: { foodRatio: 80, ingredientRatio: 20 }, // 식재료 확률 2배(20%)
      3: { foodRatio: 70, ingredientRatio: 30 }, // 식재료 확률 3배(30%)
      4: { foodRatio: 60, ingredientRatio: 40 }, // 식재료 확률 4배(40%)
      5: { foodRatio: 50, ingredientRatio: 50 }, // 식재료 확률 5배(50%)
    };

    const config = levelConfig[level] || levelConfig[1];

    // 획득 아이템 결정 (확률에 따라 사료 또는 식재료)
    const randomValue = Math.random() * 100; // 0부터 100 사이 랜덤 값

    if (randomValue < config.foodRatio) {
      // 사료 획득
      setFood((prev) => prev + 1);

      setModalConfig({
        isOpen: true,
        title: "탐색 성공",
        message: `사료 1개를 획득했습니다.\n(식재료 획득 확률: ${config.ingredientRatio}%)`,
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
    } else {
      // 식재료 획득
      setIngredients((prev) => prev + 1);

      // 새로운 식재료 발견 처리
      if (discoveredIngredients.discovered < discoveredIngredients.total) {
        // 미발견 식재료 찾기
        const undiscoveredIndex = discoveredIngredients.items.findIndex(
          (item) => !item.discovered
        );

        if (undiscoveredIndex !== -1) {
          // 식재료 아이콘 옵션 (실제 앱에서는 더 많은 아이콘과 논리 필요)
          const iconOptions = [
            "/assets/ing/ing_avocado.svg",
            "/assets/ing/ing_bread.svg",
            "/assets/ing/ing_cherry.svg",
            "/assets/ing/ing_chocolate.svg",
            "/assets/ing/ing_coffee.svg",
          ];

          // 랜덤 아이콘 선택
          const randomIcon =
            iconOptions[Math.floor(Math.random() * iconOptions.length)];

          // 랜덤 식재료 이름 생성
          const ingredientNames = [
            "아보카도",
            "빵",
            "체리",
            "초콜릿",
            "커피",
            "바나나",
            "사과",
            "포도",
            "딸기",
            "오렌지",
          ];
          const randomName =
            ingredientNames[Math.floor(Math.random() * ingredientNames.length)];

          // 아이템 배열 복사 및 업데이트
          const updatedItems = [...discoveredIngredients.items];
          updatedItems[undiscoveredIndex] = {
            ...updatedItems[undiscoveredIndex],
            discovered: true,
            name: randomName,
            icon: randomIcon,
          };

          // 발견한 식재료 상태 업데이트
          setDiscoveredIngredients({
            ...discoveredIngredients,
            discovered: discoveredIngredients.discovered + 1,
            items: updatedItems,
          });

          setModalConfig({
            isOpen: true,
            title: "새로운 식재료 발견",
            message: `축하합니다! 새로운 식재료 '${randomName}'을(를) 발견했습니다!`,
            buttons: [
              { text: "확인", onClick: () => closeModal(), type: "primary" },
            ],
          });
        } else {
          setModalConfig({
            isOpen: true,
            title: "탐색 성공",
            message: `식재료 1개를 획득했습니다.\n(식재료 획득 확률: ${config.ingredientRatio}%)`,
            buttons: [
              { text: "확인", onClick: () => closeModal(), type: "primary" },
            ],
          });
        }
      } else {
        setModalConfig({
          isOpen: true,
          title: "탐색 성공",
          message: `식재료 1개를 획득했습니다.\n(식재료 획득 확률: ${config.ingredientRatio}%)`,
          buttons: [
            { text: "확인", onClick: () => closeModal(), type: "primary" },
          ],
        });
      }
    }
  };

  return (
    <div className="game-main-container">
      <GameBackground />

      <div className="game-main-content">
        <div className="game-menu-group">
          <div className="daily-game">
            <img
              src={dailyGame}
              alt="Daily Game"
              className="daily-game-icon"
              onClick={onDailyGame}
            />
            <p className="pixel-font-kr">사료 받기</p>
          </div>
          <div className="storage">
            <img
              src={storage}
              alt="Storage"
              className="storage-icon"
              onClick={onStorage}
            />
            <p className="pixel-font-kr">보관함</p>
          </div>
        </div>

        <div className="cat-playground-container">
          <img
            src={catPlayground}
            alt="Cat Playground"
            className="cat-playground"
          />
        </div>

        {/* 레벨 상태 카드 컴포넌트 */}
        <LevelStatus
          level={level}
          currentExp={currentExp}
          energy={energy}
          food={food}
          ingredients={ingredients}
          onFeed={feedCat}
          onExplore={exploreIngredients}
        />

        {/* 발견한 식재료 컴포넌트 */}
        <DiscoveredIngredients
          discoveredCount={discoveredIngredients.discovered}
          totalCount={discoveredIngredients.total}
          ingredients={discoveredIngredients.items}
        />

        {/* 픽셀 스타일 모달 */}
        <PixelModal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          buttons={modalConfig.buttons}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default GameMain;

// import React, { useState, useEffect } from "react";

// import "./GameMain.css";
// import GameBackground from "./GameBackground";
// import catPlayground from "../../assets/game/catPlayground.svg";
// import dailyGame from "../../assets/game/dailyGame.svg";
// import storage from "../../assets/game/storage.svg";
// import LevelStatus from "./LevelStatus";
// import DiscoveredIngredients from "./DiscoveredIngredients";
// import { IngredientIcons } from "./IngredientIcons";
// import PixelModal from "./PixelModal";
// import recipes from "./RecipeData";
// import {
//   getSelectedRecipe,
//   getGameState,
//   saveGameState,
//   getDiscoveredIngredients,
//   saveDiscoveredIngredients,
// } from "../../utils/game/storageUtils";

// /**
//  * 게임 메인 화면 컴포넌트
//  * @param {Object} props - 컴포넌트 속성
//  * @param {Function} props.onDailyGame - 일일 게임 버튼 클릭 핸들러
//  * @param {Function} props.onStorage - 보관함 버튼 클릭 핸들러
//  * @returns {JSX.Element} 게임 메인 화면
//  */

// const GameMain = ({ onDailyGame, onStorage }) => {
//   // 게임 상태 관리
//   const [gameState, setGameState] = useState({
//     level: 1,
//     currentExp: 0,
//     energy: 100,
//     food: 5,
//     ingredients: 0,
//   });

//   // 발견한 식재료 상태 관리
//   const [discoveredIngredients, setDiscoveredIngredients] = useState({
//     discovered: 0,
//     total: 0,
//     items: [],
//   });

//   // 모달 상태 관리
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     buttons: [],
//   });

//   // 모달 닫기 함수
//   const closeModal = () => {
//     setModalConfig({
//       isOpen: false,
//       title: "",
//       message: "",
//       buttons: [],
//     });
//   };

//   // 선택한 레시피 상태 관리
//   const [selectedRecipe, setSelectedRecipe] = useState(null);

//   // 컴포넌트 마운트 시 상태 초기화
//   useEffect(() => {
//     // 게임 상태 불러오기
//     const savedGameState = getGameState();
//     setGameState(savedGameState);

//     // 선택한 레시피 불러오기
//     const selectedRecipeId = getSelectedRecipe();
//     if (selectedRecipeId) {
//       const recipe = recipes.find((r) => r.id === selectedRecipeId);
//       if (recipe) {
//         setSelectedRecipe(recipe);

//         // 발견한 식재료 정보 불러오기
//         const savedIngredients = getDiscoveredIngredients();

//         // 레시피에 필요한 모든 식재료 목록 생성
//         const totalIngredientsCount = recipe.ingredients.length;

//         // 이미 저장된 식재료가 있으면 사용, 없으면 초기화
//         if (savedIngredients.items.length === 0) {
//           // 처음 실행 시 일부 식재료는 이미 발견한 상태로 초기화
//           const initialDiscoveredCount = Math.min(2, totalIngredientsCount);
//           const initialItems = recipe.ingredients.map((ingredient, index) => {
//             const isDiscovered = index < initialDiscoveredCount;
//             return {
//               name: ingredient.name,
//               icon: ingredient.icon,
//               discovered: isDiscovered,
//               count: isDiscovered
//                 ? Math.floor(Math.random() * ingredient.quantity)
//                 : 0,
//               quantity: ingredient.quantity,
//             };
//           });

//           const newIngredients = {
//             discovered: initialDiscoveredCount,
//             total: totalIngredientsCount,
//             items: initialItems,
//           };

//           setDiscoveredIngredients(newIngredients);
//           saveDiscoveredIngredients(newIngredients);
//         } else {
//           setDiscoveredIngredients(savedIngredients);
//         }
//       }
//     }
//   }, []);

//   // 게임 상태 변경 시 저장
//   useEffect(() => {
//     saveGameState(gameState);
//   }, [gameState]);

//   // 발견한 식재료 변경 시 저장
//   useEffect(() => {
//     saveDiscoveredIngredients(discoveredIngredients);
//   }, [discoveredIngredients]);

//   /**
//    * 밥 주기 기능: 사료를 소모하여 경험치와 에너지 증가
//    */

//   const feedCat = () => {
//     // 사료 확인
//     if (gameState.food < 1) {
//       setModalConfig({
//         isOpen: true,
//         title: "사료 부족",
//         message: "사료가 부족합니다!",
//         buttons: [
//           { text: "확인", onClick: () => closeModal(), type: "primary" },
//         ],
//       });
//       return;
//     }

//     // 레벨별 최대 경험치 설정
//     const maxExp = gameState.level * 100;

//     // 사료 주기 (경험치 10 증가, 에너지 100 증가)
//     const expGain = 10;
//     const energyGain = 100;

//     // 사료 차감
//     const newFood = gameState.food - 1;

//     // 에너지 증가
//     const newEnergy = gameState.energy + energyGain;

//     // 경험치 처리 및 레벨업 확인
//     let newLevel = gameState.level;
//     let newExp = gameState.currentExp + expGain;

//     if (newExp >= maxExp && newLevel < 5) {
//       // 레벨 업
//       newLevel += 1;
//       newExp = 0;

//       setTimeout(() => {
//         setModalConfig({
//           isOpen: true,
//           title: "Level Up",
//           message: `축하합니다!\n레벨 ${newLevel}로 성장했습니다!`,
//           buttons: [
//             {
//               text: "확인",
//               onClick: () => closeModal(),
//               type: "primary",
//             },
//           ],
//         });
//       }, 1000); // 모달 전환 시 약간의 딜레이 추가
//     } else if (newExp >= maxExp) {
//       // 최대 레벨인 경우 최대 경험치로 고정
//       newExp = maxExp;

//       setTimeout(() => {
//         setModalConfig({
//           isOpen: true,
//           title: "최대 레벨",
//           message: "이미 최대 레벨에 도달했습니다!",
//           buttons: [
//             {
//               text: "확인",
//               onClick: () => closeModal(),
//               type: "primary",
//             },
//           ],
//         });
//       }, 300);
//     }
//     // 상태 업데이트
//     setGameState({
//       ...gameState,
//       level: newLevel,
//       currentExp: newExp,
//       energy: newEnergy,
//       food: newFood,
//     });

//     // 밥 주기 결과 모달 표시
//     setModalConfig({
//       isOpen: true,
//       title: "밥 주기 성공",
//       message: `사료를 주었습니다!\n에너지 ${energyGain} 증가\n경험치 ${expGain} 증가`,
//       buttons: [{ text: "확인", onClick: () => closeModal(), type: "primary" }],
//     });
//   };

//   /**
//    * 식재료 발견 처리 함수
//    * @param {string} ingredientName - 발견한 식재료 이름
//    * @param {number} count - 획득 수량 (기본값 1)
//    */
//   const discoverIngredient = (ingredientName, count = 1) => {
//     if (!selectedRecipe) return;

//     // 현재 식재료 목록 복사
//     const updatedItems = [...discoveredIngredients.items];

//     // 해당 식재료 찾기
//     const ingredientIndex = updatedItems.findIndex(
//       (item) => item.name === ingredientName
//     );

//     if (ingredientIndex !== -1) {
//       // 이미 목록에 있는 식재료인 경우
//       const ingredientItem = updatedItems[ingredientIndex];

//       // 새로운 상태 계산
//       const isNewlyDiscovered = !ingredientItem.discovered;
//       const newCount = ingredientItem.count + count;

//       // 아이템 업데이트
//       updatedItems[ingredientIndex] = {
//         ...ingredientItem,
//         discovered: true,
//         count: newCount,
//       };

//       // 전체 발견 식재료 수 업데이트
//       const newDiscoveredCount = isNewlyDiscovered
//         ? discoveredIngredients.discovered + 1
//         : discoveredIngredients.discovered;

//       // 상태 업데이트
//       setDiscoveredIngredients({
//         ...discoveredIngredients,
//         discovered: newDiscoveredCount,
//         items: updatedItems,
//       });

//       // 처리 결과 반환
//       return {
//         isNewlyDiscovered,
//         newCount,
//         name: ingredientName,
//       };
//     }
//     return null;
//   };

//   /**
//    * 탐색하기 기능: 에너지를 소모하여 식재료 또는 사료 획득
//    */
//   const exploreIngredients = () => {
//     // 에너지 확인 (탐색에는 에너지 50 필요)
//     if (gameState.energy < 50) {
//       setModalConfig({
//         isOpen: true,
//         title: "에너지 부족",
//         message: "탐색을 위한 에너지가 부족합니다!",
//         buttons: [
//           { text: "확인", onClick: () => closeModal(), type: "primary" },
//         ],
//       });
//       return;
//     }

//     // 에너지 소모
//     const newEnergy = gameState.energy - 50;

//     // 경험치 증가
//     const newExp = gameState.currentExp + 20;

//     // 레벨별 식재료 획득 확률 (레벨이 높을수록 식재료를 얻을 확률 증가)
//     const levelConfig = {
//       1: { foodRatio: 90, ingredientRatio: 10 }, // 식재료 확률 1배(10%)
//       2: { foodRatio: 80, ingredientRatio: 20 }, // 식재료 확률 2배(20%)
//       3: { foodRatio: 70, ingredientRatio: 30 }, // 식재료 확률 3배(30%)
//       4: { foodRatio: 60, ingredientRatio: 40 }, // 식재료 확률 4배(40%)
//       5: { foodRatio: 50, ingredientRatio: 50 }, // 식재료 확률 5배(50%)
//     };

//     const config = levelConfig[gameState.level] || levelConfig[1];

//     // 획득 아이템 결정 (확률에 따라 사료 또는 식재료)
//     const randomValue = Math.random() * 100; // 0부터 100 사이 랜덤 값

//     if (randomValue < config.foodRatio) {
//       // 사료 획득
//       const newFood = gameState.food + 1;

//       // 상태 업데이트
//       setGameState({
//         ...gameState,
//         energy: newEnergy,
//         currentExp: newExp,
//         food: newFood,
//       });

//       setModalConfig({
//         isOpen: true,
//         title: "탐색 성공",
//         message: `식재료 1개를 획득했습니다.\n(식재료 획득 확률: ${config.ingredientRatio}%)`,
//         buttons: [
//           { text: "확인", onClick: () => closeModal(), type: "primary" },
//         ],
//       });
//     } else {
//       // 식재료 획득 - 아직 발견하지 못한 식재료 중에서 랜덤으로 선택
//       const notDiscoveredIngredients = discoveredIngredients.items.filter(
//         (item) => !item.discovered
//       );

//       // 결과를 저장할 변수
//       let discoveryResult = null;

//       // 모든 식재료를 이미 발견한 경우
//       if (notDiscoveredIngredients.length === 0) {
//         // 발견된 식재료 중 랜덤으로 선택
//         const discoveredItems = discoveredIngredients.items.filter(
//           (item) => item.discovered && item.count < item.quantity
//         );

//         if (discoveredItems.length > 0) {
//           // 아직 필요 수량에 도달하지 않은 식재료 중 랜덤 선택
//           const randomIngredient =
//             discoveredItems[Math.floor(Math.random() * discoveredItems.length)];

//           // 식재료 발견 처리
//           discoveryResult = discoverIngredient(randomIngredient.name);
//         } else {
//           // 모든 식재료가 충분히 모였다면 완성된 레시피를 보관함에 저장하는 로직 구현 필요
//           //
//           //
//           //
//           //

//           const newFood = gameState.food + 1; // 임시로 사료 지급

//           // 상태 업데이트
//           setGameState({
//             ...gameState,
//             energy: newEnergy,
//             currentExp: newExp,
//             food: newFood,
//           });

//           setModalConfig({
//             isOpen: true,
//             title: "레시피 완성",
//             message:
//               "모든 식재료를 발견해서 레시피가 완성됐습니다!\n 보관함에서 확인하세요!",
//             buttons: [
//               { text: "확인", onClick: () => closeModal(), type: "primary" },
//             ],
//           });
//           return;
//         }
//       } else {
//         // 발견하지 못한 식재료 중 랜덤 선택
//         const randomIngredient =
//           notDiscoveredIngredients[
//             Math.floor(Math.random() * notDiscoveredIngredients.length)
//           ];

//         // 식재료 발견 처리
//         discoveryResult = discoverIngredient(randomIngredient.name);
//       }

//       // 식재료 발견 처리가 성공했을 경우
//       if (discoveryResult) {
//         // 식재료 카운트 증가
//         const newIngredients = gameState.ingredients + 1;

//         // 상태 업데이트
//         setGameState({
//           ...gameState,
//           energy: newEnergy,
//           currentExp: newExp,
//           ingredients: newIngredients,
//         });

//         // 모달 표시
//         setModalConfig({
//           isOpen: true,
//           title: discoveryResult.isNewlyDiscovered
//             ? "새로운 발견!"
//             : "식재료 획득!",
//           message: discoveryResult.isNewlyDiscovered
//             ? `새로운 식재료 "${discoveryResult.name}"을(를) 발견했습니다!`
//             : `식재료 "${discoveryResult.name}" 1개를 획득했습니다!`,
//           buttons: [
//             { text: "확인", onClick: () => closeModal(), type: "primary" },
//           ],
//         });
//       }
//     }
//   };

//   return (
//     <div className="game-main-container">
//       <GameBackground />

//       <div className="game-main-content">
//         <div className="game-menu-group">
//           <div className="daily-game">
//             <img
//               src={dailyGame}
//               alt="Daily Game"
//               className="daily-game-icon"
//               onClick={onDailyGame}
//             />
//             <p className="pixel-font-kr">사료 받기</p>
//           </div>
//           <div className="storage">
//             <img
//               src={storage}
//               alt="Storage"
//               className="storage-icon"
//               onClick={onStorage}
//             />
//             <p className="pixel-font-kr">보관함</p>
//           </div>
//         </div>

//         <div className="cat-playground-container">
//           <img
//             src={catPlayground}
//             alt="Cat Playground"
//             className="cat-playground"
//           />
//         </div>

//         {/* 레벨 상태 카드 컴포넌트 */}
//         <LevelStatus
//           level={gameState.level}
//           currentExp={gameState.currentExp}
//           energy={gameState.energy}
//           food={gameState.food}
//           ingredients={gameState.ingredients}
//           onFeed={feedCat}
//           onExplore={exploreIngredients}
//         />

//         {/* 발견한 식재료 컴포넌트 */}
//         <DiscoveredIngredients
//           discoveredIngredients={discoveredIngredients.items}
//         />

//         {/* 픽셀 스타일 모달 */}
//         <PixelModal
//           isOpen={modalConfig.isOpen}
//           title={modalConfig.title}
//           message={modalConfig.message}
//           buttons={modalConfig.buttons}
//           onClose={closeModal}
//         />
//       </div>
//     </div>
//   );
// };

// export default GameMain;
