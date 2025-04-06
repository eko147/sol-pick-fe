
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageContent.css";
import { authApi } from "../../api/AuthApi";
import ButtonS from "../common/button/ButtonS";
import MyPageMenuItem from "./MyPageMenuItem";
import { useToast } from "../../context/ToastContext";

// 새로운 RecipeBanner 컴포넌트
const RecipeBanner = () => {
  return (
    <div className="recipe-banner">
      {/* <div className="recipe-banner-icon">
      </div> */}
      <div className="recipe-banner-content">
        <h3>당신이 선택한 레시피</h3>
        <p>이제 들으면서 요리하세요</p>
      </div>
      <div className="recipe-banner-headphone">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.75 13C4.75 8.99594 8.02411 5.75 12 5.75C15.9759 5.75 19.25 8.99594 19.25 13V18.25C19.25 19.3546 18.3546 20.25 17.25 20.25H16.75C15.6454 20.25 14.75 19.3546 14.75 18.25V14.75C14.75 13.6454 15.6454 12.75 16.75 12.75H19.25M4.75 13V18.25C4.75 19.3546 5.64543 20.25 6.75 20.25H7.25C8.35457 20.25 9.25 19.3546 9.25 18.25V14.75C9.25 13.6454 8.35457 12.75 7.25 12.75H4.75" stroke="#0A84FF" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

const MyPageContent = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 사용자 로그인 여부 확인
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 현재 사용자 정보와 로그인 상태 가져오기
    const user = authApi.getCurrentUser();
    const loggedIn = authApi.isAuthenticated();

    setCurrentUser(user);
    setIsLoggedIn(loggedIn);
  }, []);

  // 로그인 버튼 핸들러
  const handleLoginClick = () => {
    navigate("/login");
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 먼저 로그아웃 처리
    authApi.logout();

    showToast("로그아웃 되었습니다.");

    // 로그아웃 처리 후 메인 페이지로 이동
    navigate("/main");
  };

  // 각 메뉴 항목
  const menuItems = [
    {
      id: "favorites",
      title: "찜한 레시피",
      icon: "star",
      path: "/mypage/favorites",
    },
    {
      id: "order",
      title: "결제 내역",
      icon: "order",
      path: "/mypage/orders",
    },
    {
      id: "user-info",
      title: "개인정보",
      icon: "lock",
      path: "/account",
    },
    {
      id: "account",
      title: "알러지 정보",
      icon: "user",
      path: "/mypage/allergy-management",
    },
  ];

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <h1 className="mypage-title">마이페이지</h1>
        {isLoggedIn && (
          <p className="mypage-greeting">
            안녕하세요,{" "}
            <span className="bold">{currentUser?.name || "회원"}</span>님
          </p>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="login-banner-container">
          <p className="login-banner-ment">
            지금 바로 로그인하고
            <br />
            SOL Pick의 다양한 혜택을 경험해보세요!
          </p>
          <div className="login-banner-button-container">
            <ButtonS
              text="회원가입"
              variant="outlined"
              width="88px"
              height="24px"
            />
            <ButtonS
              text="로그인"
              width="88px"
              height="24px"
              onClick={handleLoginClick}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mypage-menu-grid">
            {menuItems.map((item) => (
              <MyPageMenuItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>

          {/* 기존 배너를 새로운 RecipeBanner 컴포넌트로 변경 */}
          <RecipeBanner />

          {/* <div className="mypage-logout-container">
            <ButtonS
              text="로그아웃"
              onClick={handleLogout}
              variant="outlined"
              width="100px"
              height="36px"
            />
          </div> */}

          <div className="mypage-logout-container">
            <button className="logout-text-button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPageContent;