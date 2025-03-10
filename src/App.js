import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Components from "./pages/Components";
import Main from "./pages/main/Main";
import Noti from "./pages/noti/Noti";
import IngredientAddForm from "./pages/refrigerator/IngredientAddForm";
import IngredientDetailList from "./pages/refrigerator/IngredientDetailList";
import RefrigeratorMain from "./pages/refrigerator/RefrigeratorMain";
import CardIssuePage from "./pages/card/CardIssuePage"; // 카드 발급 안내 페이지
import CardDetailPage from "./pages/card/CardDetailPage"; // 카드 상세 페이지
import CardDesignSelectionPage from "./pages/card/CardDesignSelectionPage"; // 카드 디자인 선택 페이지
import CardIdentityVerificationPage from "./pages/card/CardIdentityVerificationPage"; // 본인 인증 페이지
import CardTermsPage from "./pages/card/CardTermsPage"; // 약관 동의 페이지
import CardCreditRatingPage from "./pages/card/CardCreditRatingPage"; // 신용 정보 확인 페이지
import CardApplyInfoPage from "./pages/card/CardApplyInfoPage"; // 카드 신청 정보 입력 페이지
import CardCompletionPage from "./pages/card/CardCompletionPage"; // 카드 발급 완료 페이지 추가
import LoginPage from './pages/auth/LoginPage';//로그인페이지

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

        {/* 알림 */}
        <Route path="/noti" element={<Noti />} />

        {/* 냉장고 */}
        <Route path="/ingredientaddform" element={<IngredientAddForm />} />
        <Route
          path="/ingredientdetaillist"
          element={<IngredientDetailList />}
        />
        <Route path="/refrigeratormain" element={<RefrigeratorMain />} />

        {/* 카드 신청 관련 라우트 */}
        <Route path="/card" element={<CardIssuePage />} />
        <Route path="/card/detail" element={<CardDetailPage />} />
        <Route
          path="/card/apply/design"
          element={<CardDesignSelectionPage />}
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
      </Route>
    </Routes>
  );
}

export default App;
