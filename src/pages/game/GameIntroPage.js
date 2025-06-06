import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameIntroPage.css";

// 카드 디자인 컴포넌트
import GameIntro from "../../components/game/GameIntro";
import GameBackground from "../../components/game/GameBackground";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";

const GameIntroPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleBack = () => navigate(-1);
  const handleClose = () => navigate("/card");
  const handleNext = () => navigate("/game/home");

  // 커스텀 헤더 스타일 정의
  const customHeaderStyle = {
    fontFamily: "'Kablammo', cursive",
    // 필요한 경우 추가 스타일 속성 지정
    fontSize: "24px",
  };

  return (
    <div className="game-intro-page-container">
      <GameBackground />

      <Header
        leftIcon={backArrow}
        title="Foody Cat"
        rightIcon={close}
        onLeftClick={handleBack}
        onRightClick={handleClose}
        titleStyle={customHeaderStyle} // 커스텀 스타일 전달
      />

      <div className="game-intro-component-container">
        <GameIntro onNext={handleNext} />
      </div>
    </div>
  );
};

export default GameIntroPage;
