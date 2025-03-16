import "./Main.css";
import MainHeader from "../../components/common/header/MainHeader";
// import noti from "../../assets/noti.svg";
// import notiActive from "../../assets/notiActive.svg";
// import shop from "../../assets/shop.svg";
// import shopActive from "../../assets/shopActive.svg";
import EventSection from "../../components/main/event-card/EventCard";
import Menu from "../../components/common/menu/Menu";
import { useNavigate } from "react-router-dom";
import ButtonS from "./../../components/common/button/ButtonS";
import { authApi } from "../../api/AuthApi"; // authApi 추가

const Main = () => {
  const navigate = useNavigate();

  // 사용자 로그인 여부 확인
  const currentUser = authApi.getCurrentUser();
  const isLoggedIn = authApi.isAuthenticated();
  //

  // const navigateToShop = () => { };

  // const navigateToNoti = () => {
  //   navigate("/noti");
  // };

  // 로그인 버튼 핸들러 추가
  const handleLoginClick = () => {
    navigate("/login");
  };


  const promo = [
    {
      title: "PROMOTION",
      description:
        "ReciPICK X 신한카드\nSOL Pick 카드 발급받고\n포인트 챙겨가세요!",
      image: "image-url",
      bgColor: "#d9d9d9",
    },
  ];

  const meals = [
    {
      title: "MEAL",
      description: "당신의 일주일치 식단을\nSOL Pick이 책임집니다!",
      image: "image-url",
      bgColor: "#d9d9d9",
    },
  ];

  const benefit = [
    {
      title: "NEW ARRIVAL",
      description: "새로 입고된\n봄 시즌 한정 식재료를\n만나보세요!",
      image: "image-url",
      bgColor: "#d9d9d9",
      additionalDate: "2025. 3. 3 (월) - 4. 14 (월)",
    },
    {
      title: "DEAL",
      description: "연휴 기간 동안\n최대 50% 할인!",
      image: "image-url",
      bgColor: "#d9d9d9",
      additionalDate: "2025. 3. 1 (토) - 3. 3 (월)",
    },
  ];

  const event = [
    {
      title: "EVENT",
      description: "게임 한 판에\n포인트 혜택을 받아보세요!",
      image: "image-url",
      bgColor: "#d9d9d9",
    },
  ];

  const news = [
    {
      title: "NEWS",
      description: "저속노화의 비법\n같이 알아봐요!",
      image: "image-url",
      bgColor: "#d9d9d9",
    },
  ];

  return (
    <>
      <MainHeader
        // leftIcon={shop}
        // leftIconActive={shopActive}
        // rightIcon={noti}
        // rightIconActive={notiActive}
        // onLeftClick={navigateToShop}
        // onRightClick={navigateToNoti}
      />

      <p className="greeting-ment bold">
        {currentUser ? `${currentUser.name}님` : "OO님"}, 설렘 가득한 발걸음으로 <br /> 하루를 시작해 볼까요?
      </p>

      {!isLoggedIn && (
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
              width="80px"
              height="24px"
            // onClick={handleSignupClick}
            />
            <ButtonS
              text="로그인"
              width="80px"
              height="24px"
              onClick={handleLoginClick}
            />
          </div>
        </div>
      )}

      <EventSection
        sectionTitle="레시픽 회원이라면 이 카드 어떠세요?"
        events={promo}
      />

      <EventSection sectionTitle="식단 추천 받으세요" events={meals} />

      <EventSection sectionTitle="봄 시즌 특별 혜택" events={benefit} />

      <EventSection
        sectionTitle="SOL Pick 고객님만을 위한 특별한 이벤트"
        events={event}
      />

      <EventSection sectionTitle="오늘의 영양 뉴스" events={news} />

      <div style={{ height: "76px" }}></div>

      <Menu />
    </>
  );
};
export default Main;
