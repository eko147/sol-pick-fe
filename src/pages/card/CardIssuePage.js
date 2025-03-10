import React from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/common/header/MainHeader";
import noti from "../../assets/noti.svg";
import notiActive from "../../assets/notiActive.svg";
import shop from "../../assets/shop.svg";
import shopActive from "../../assets/shopActive.svg";
import Menu from "../../components/common/menu/Menu";
import "./CardIssuePage.css";

// 메인 컴포넌트
const CardIssuePage = () => {
  const navigateToShop = () => {};

  const navigateToNoti = () => {};

  const navigate = useNavigate();

  const handleCardDetail = () => {
    navigate("/card/detail");
  };

  const handleCardIssue = () => {
    navigate("/card/detail");
  };

  return (
    <div className="card-issue-page-container">
      <MainHeader
        leftIcon={shop}
        leftIconActive={shopActive}
        rightIcon={noti}
        rightIconActive={notiActive}
        onLeftClick={navigateToShop}
        onRightClick={navigateToNoti}
      />

      <div
        className="card-detail-handler-container"
        onClick={handleCardDetail}
      ></div>

      <div className="message-container">
        <h2 className="message-title">
          아직 쏠픽(SOL Pick) 카드가 없으신가요?
        </h2>
        <p className="message-subtext">
          쏠픽(SOL Pick) 카드를 발급받고 다양한 혜택을 누려보세요.
        </p>
        <button className="issue-button" onClick={handleCardIssue}>
          카드 발급받기
        </button>
      </div>

      <Menu />
    </div>
  );
};

export default CardIssuePage;
