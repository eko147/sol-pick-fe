import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Components from "./pages/Components";
import Main from "./pages/main/Main";
import Noti from "./pages/noti/Noti";
import IngredientAddForm from "./pages/refrigerator/add/IngredientAddForm";
import IngredientDetailList from "./pages/refrigerator/list/IngredientDetailList";
import RefrigeratorMain from "./pages/refrigerator/main/RefrigeratorMain";
import RefrigeratorMainv2 from "./pages/refrigerator/main/RefrigeratorMainv2";
import RefrigeratorMainCarousel from "./pages/refrigerator/main/RefrigeratorMainCarousel";
import RecipeRecommendation from "./pages/refrigerator/recommendation/RecipeRecommendation";
import RecipeLoading from "./pages/refrigerator/recommendation/RecipeLoading";
import RecipeDetail from "./pages/refrigerator/recommendation/RecipeDetail";
import CardIssuePage from "./pages/card/CardIssuePage"; // 카드 발급 안내 페이지
import CardDetailPage from "./pages/card/CardDetailPage"; // 카드 상세 페이지
import CardDesignSelectionPage from "./pages/card/CardDesignSelectionPage"; // 카드 디자인 선택 페이지
import CardCustomDirectionPage from "./pages/card/CardCustomDirectionPage"; // 카드 방향 선택 페이지
import CardCustomBackgroundPage from "./pages/card/CardCustomBackgroundPage"; // 카드 배경 선택 페이지
import CardCustomStickerPage from "./pages/card/CardCustomStickerPage"; // 카드 스티커 선택 페이지
import CardIdentityVerificationPage from "./pages/card/CardIdentityVerificationPage"; // 본인 인증 페이지
import CardTermsPage from "./pages/card/CardTermsPage"; // 약관 동의 페이지
import CardCreditRatingPage from "./pages/card/CardCreditRatingPage"; // 신용 정보 확인 페이지
import CardApplyInfoPage from "./pages/card/CardApplyInfoPage"; // 카드 신청 정보 입력 페이지
import CardCompletionPage from "./pages/card/CardCompletionPage"; // 카드 발급 완료 페이지 추가
import LoginPage from './pages/auth/LoginPage';//로그인페이지
import MyPage from "./pages/mypage/MyPage";//마이페이지
import OrderHistoryPage from "./pages/mypage/OrderHistoryPage";


import RecipeSelectionPage from "./pages/game/RecipeSelectionPage"; // 레시피 선택 페이지
import CatGreetingPage from "./pages/game/CatGreetingPage"; // 고양이 인사 페이지
import GameIntroPage from "./pages/game/GameIntroPage"; // 게임 안내 페이지
// import GameMainPage from "./pages/game/GameMainPage"; // 게임 메인 페이지

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 공통 컴포넌트 */}
        <Route path="/components" element={<Components />} />

        {/* 메인 */}
        <Route path="/main" element={<Main />} />

        {/* 로그인 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 마이페이지/결제내역 */}
        <Route path="/orders" element={<OrderHistoryPage />} />

        {/* 알림 */}
        <Route path="/noti" element={<Noti />} />

        {/* 냉장고 */}
        <Route path="/ingredientaddform" element={<IngredientAddForm />} />
        <Route
          path="/ingredientdetaillist"
          element={<IngredientDetailList />}
        />
        {/* 냉장고 메인 */}
        <Route path="/refrigeratormain" element={<RefrigeratorMain />} />
        <Route path="/refrigeratormain2" element={<RefrigeratorMainv2 />} />
        <Route
          path="/refrigeratormaincarousel"
          element={<RefrigeratorMainCarousel />}
        />
        <Route path="/recipe-loading" element={<RecipeLoading />} />
        <Route path="/recipe-recommendation" element={<RecipeRecommendation />} />
        <Route path="/recipe-detail/:id" element={<RecipeDetail />} />
        {/* 카드 신청 관련 라우트 */}
        <Route path="/card" element={<CardIssuePage />} />
        <Route path="/card/detail" element={<CardDetailPage />} />
        <Route
          path="/card/apply/design"
          element={<CardDesignSelectionPage />}
        />
        <Route
          path="/card/apply/custom/direction"
          element={<CardCustomDirectionPage />}
        />
        <Route
          path="/card/apply/custom/background"
          element={<CardCustomBackgroundPage />}
        />
        <Route
          path="/card/apply/custom/sticker"
          element={<CardCustomStickerPage />}
        />
        <Route
          path="/card/apply/identity-verification"
          element={<CardIdentityVerificationPage />}
        />
        <Route path="/card/apply/terms" element={<CardTermsPage />} />
        <Route
          path="/card/apply/credit-rating"
          element={<CardCreditRatingPage />}
        />
        <Route path="/card/apply/apply-info" element={<CardApplyInfoPage />} />
        <Route path="/card/apply/completion" element={<CardCompletionPage />} />

        {/* 미니 게임 관련 라우트 */}
        <Route path="/game/recipe" element={<RecipeSelectionPage />} />
        <Route path="/game/greeting" element={<CatGreetingPage />} />
        <Route path="/game/intro" element={<GameIntroPage />} />
        {/* <Route path="/game/main" element={<GameMainPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
