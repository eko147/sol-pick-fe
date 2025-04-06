// 1. 핵심 라이브러리 및 스타일
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastProvider } from "./context/ToastContext";
import ToastMessage from "./components/common/toastmessage/ToastMessage";

// 2. 레이아웃 및 공통 컴포넌트
import Layout from "./layout/Layout"; // 전체 레이아웃
import Components from "./pages/Components"; // 공통 컴포넌트

// 3. 기본 페이지
import Onboarding from "./pages/onboarding/Onboarding"; // 온보딩 페이지
import Main from "./pages/main/Main"; // 메인 페이지
import Noti from "./pages/noti/Noti"; // 알림 페이지

// 4. 냉장고 관련 페이지
import Refrigerator from "./pages/refrigerator/main/Refrigerator"; // 냉장고 메인 페이지
import IngredientAddForm from "./pages/refrigerator/add/IngredientAddForm"; // 식재료 등록 페이지
import IngredientEditForm from "./pages/refrigerator/add/IngredientEditForm"; // 식재료 수정 페이지
import IngredientDetailList from "./pages/refrigerator/list/IngredientDetailList"; // 식재료 상세 목록 페이지

// 5. 레시피 추천 관련 페이지
import RecipeRecommendation from "./pages/refrigerator/recommendation/RecipeRecommendation"; // 레시피 추천 페이지
import RecipeLoading from "./pages/refrigerator/recommendation/RecipeLoading"; // 레시피 로딩 화면
import RecipeDetail from "./pages/refrigerator/recommendation/RecipeDetail"; // 레시피 상세 정보

// 6. 알러지/식단 관련 페이지
import AllergyManagement from "./pages/mypage/AllergyManagement"; // 알러지 관리 페이지
import SurveyPage from "./pages/main/SurveyPage"; // 설문 페이지
import SurveyResult from "./pages/main/SurveyResult"; // 설문 결과 페이지
import MealDetail from "./pages/main/MealDetail"; // 식단 상세 페이지

// 7. 카드 서비스 관련 페이지
import CardIssuePage from "./pages/card/CardIssuePage"; // 카드 발급 안내 페이지
import CardDetailPage from "./pages/card/CardDetailPage"; // 카드 상세 페이지
import CardDesignSelectionPage from "./pages/card/CardDesignSelectionPage"; // 카드 디자인 선택 페이지
import CardCustomBackgroundPage from "./pages/card/CardCustomBackgroundPage"; // 카드 배경 선택 페이지
import CardCustomStickerPage from "./pages/card/CardCustomStickerPage"; // 카드 스티커 선택 페이지
import CardIdentityVerificationPage from "./pages/card/CardIdentityVerificationPage"; // 본인 인증 페이지
import CardTermsPage from "./pages/card/CardTermsPage"; // 약관 동의 페이지
import CardCreditRatingPage from "./pages/card/CardCreditRatingPage"; // 신용 정보 확인 페이지
import CardApplyInfoPage from "./pages/card/CardApplyInfoPage"; // 카드 신청 정보 입력 페이지
import CardCompletionPage from "./pages/card/CardCompletionPage"; // 카드 발급 완료 페이지

// 8. 게임 관련 페이지
import GameEntryHandler from "./pages/game/GameEntryHandler"; // 게임 진입 처리 컴포넌트
import GameInitPage from "./pages/game/GameInitPage"; // 레시피 선택 페이지
import CatGreetingPage from "./pages/game/CatGreetingPage"; // 고양이 인사 페이지
import GameIntroPage from "./pages/game/GameIntroPage"; // 게임 안내 페이지
import GameMainPage from "./pages/game/GameMainPage"; // 게임 메인 페이지
import GameInstructionsPage from "./pages/game/GameInstructionsPage"; // 게임 안내 페이지
import DailyGameMainPage from "./pages/game/DailyGameMainPage"; // 카드 뒤집기 게임 페이지
import GameStoragePage from "./pages/game/GameStoragePage"; // 보관함 페이지

// 9. 사용자 관련 페이지
import LoginPage from "./pages/auth/LoginPage"; // 로그인 페이지
import MyPage from "./pages/mypage/MyPage"; // 마이페이지
import OrderHistoryPage from "./pages/mypage/OrderHistoryPage"; // 주문 내역 페이지
import PointPage from "./pages/point/PointPage"; // 포인트 페이지
import RecipePage from "./pages/recipe/RecipePage"; // 레시피북 페이지
import FavoritesPage from "./pages/mypage/FavoritesPage"; // 찜한 레시피 페이지

// 10. 유틸리티 및 API
import { useEffect } from "react"; // React Hook
import { authApi } from "./api/AuthApi"; // 인증 API
import RecipickSyncApi from "./api/RecipickSyncApi"; // 레시피 동기화 API

function App() {
  useEffect(() => {
    // 사용자가 로그인한 경우에만 동기화 시작
    if (authApi.isAuthenticated()) {
      // 동기화 서비스 시작
      const stopSync = RecipickSyncApi.startPeriodicSync();

      // 컴포넌트 언마운트(앱 종료) 시 동기화 중지
      return () => {
        stopSync();
      };
    }
  }, []);

  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* 2. 레이아웃 및 공통 컴포넌트 */}
          <Route path="/components" element={<Components />} />
          {/* 3. 기본 페이지 */}
          <Route path="/" element={<Onboarding />} /> // 온보딩
          <Route path="/main" element={<Main />} /> // 메인
          <Route path="/noti" element={<Noti />} /> // 알림
          {/* 4. 냉장고 관련 페이지 */}
          <Route path="/refrigerator" element={<Refrigerator />} /> // 냉장고
          메인
          <Route path="/refrigerator/add" element={<IngredientAddForm />} /> //
          식재료 등록
          <Route
            path="/refrigerator/update/:id"
            element={<IngredientEditForm />}
          />{" "}
          // 식재료 수정
          <Route
            path="/refrigerator/list"
            element={<IngredientDetailList />}
          />{" "}
          // 식재료 목록
          {/* 5. 레시피 추천 관련 페이지 */}
          <Route path="/recipe-loading" element={<RecipeLoading />} /> // 레시피
          로딩
          <Route
            path="/refrigerator/recipe-recommendation"
            element={<RecipeRecommendation />}
          />{" "}
          // 레시피 추천
          <Route
            path="/refrigerator/recipe-detail/:id"
            element={<RecipeDetail />}
          />{" "}
          // 레시피 상세
          {/* 6. 알러지/식단 관련 페이지 */}
          <Route
            path="/mypage/allergy-management"
            element={<AllergyManagement />}
          />{" "}
          // 알러지 관리
          <Route path="/survey-page" element={<SurveyPage />} /> // 설문
          <Route path="/survey-result" element={<SurveyResult />} /> // 설문
          결과
          <Route path="/meal-detail" element={<MealDetail />} /> // 식단 상세
          {/* 7. 카드 서비스 관련 페이지 */}
          <Route path="/card" element={<CardIssuePage />} /> // 카드 발급 안내
          <Route path="/card/detail" element={<CardDetailPage />} /> // 카드
          상세
          <Route path="/card/points" element={<PointPage />} /> // 포인트 관리
          {/* 카드 신청 프로세스 */}
          <Route
            path="/card/apply/design"
            element={<CardDesignSelectionPage />}
          />{" "}
          // 디자인 선택
          <Route
            path="/card/apply/custom/background"
            element={<CardCustomBackgroundPage />}
          />{" "}
          // 배경 선택
          <Route
            path="/card/apply/custom/sticker"
            element={<CardCustomStickerPage />}
          />{" "}
          // 스티커 선택
          <Route
            path="/card/apply/identity-verification"
            element={<CardIdentityVerificationPage />}
          />{" "}
          // 본인 인증
          <Route path="/card/apply/terms" element={<CardTermsPage />} /> // 약관
          동의
          <Route
            path="/card/apply/credit-rating"
            element={<CardCreditRatingPage />}
          />{" "}
          // 신용 정보
          <Route
            path="/card/apply/apply-info"
            element={<CardApplyInfoPage />}
          />{" "}
          // 신청 정보
          <Route
            path="/card/apply/completion"
            element={<CardCompletionPage />}
          />{" "}
          // 발급 완료
          {/* 8. 게임 관련 페이지 */}
          <Route path="/game" element={<GameEntryHandler />} /> // 게임 진입점
          <Route path="/game/init" element={<GameInitPage />} /> // 게임 초기화
          <Route path="/game/greeting" element={<CatGreetingPage />} /> //
          고양이 인사
          <Route path="/game/intro" element={<GameIntroPage />} /> // 게임 소개
          <Route path="/game/home" element={<GameMainPage />} /> // 게임 메인
          <Route
            path="/game/instructions"
            element={<GameInstructionsPage />}
          />{" "}
          // 게임 설명
          <Route path="/game/daily-game" element={<DailyGameMainPage />} /> //
          일일 게임
          <Route path="/game/storage" element={<GameStoragePage />} /> // 보관함
          {/* 9. 사용자 관련 페이지 */}
          <Route path="/login" element={<LoginPage />} /> // 로그인
          <Route path="/mypage" element={<MyPage />} /> // 마이페이지
          <Route path="/mypage/recipe/:id" element={<RecipePage />} /> //
          레시피북
          <Route path="/mypage/favorites" element={<FavoritesPage />} /> // 찜한
          레시피
          <Route path="/mypage/orders" element={<OrderHistoryPage />} /> // 주문
          내역
        </Route>
      </Routes>
      <ToastMessage />
    </ToastProvider>
  );
}

export default App;
