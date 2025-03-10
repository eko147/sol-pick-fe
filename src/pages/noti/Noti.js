import "./Noti.css";
import Header from "../../components/common/header/Header";
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";
import Chip from "../../components/common/chip/Chip";
import { useEffect, useState } from "react";
import NotiList from "../../components/noti/noti-list/NotiList";

const Noti = () => {
  const chipItems = ["전체", "유통기한", "재구매"];

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
    // API에서 알림 데이터를 가져오는 함수
    const fetchNotifications = async () => {
      try {
        // 실제 환경에서는 API 호출로 대체
        // const response = await fetch('/api/notifications');
        // const data = await response.json();

        // 예시 데이터
        const mockData = [
          {
            id: "noti1",
            type: "expiration",
            title: "유통기한 알림",
            description: "당근, 사과, 양배추의 유통기한이 얼마 남지 않았어요!",
            timestamp: "2025. 03. 04. 09:00",
          },
          {
            id: "noti2",
            type: "expiration",
            title: "유통기한 알림",
            description: "우유의 유통기한이 1일 남았어요!",
            timestamp: "2025. 03. 04. 09:00",
          },
          {
            id: "noti3",
            type: "reorder",
            title: "재구매 알림",
            description: "매주 월요일마다 사과를 구매했어요!",
            timestamp: "2025. 03. 03. 11:45",
          },
          {
            id: "noti4",
            type: "reorder",
            title: "재구매 알림",
            description: "당근 살 때 안 되셨나요?",
            timestamp: "2025. 03. 01. 08:20",
          },
          {
            id: "noti5",
            type: "expiration",
            title: "유통기한 알림",
            description: "우유의 유통기한이 1일 남았어요!",
            timestamp: "2025. 02. 28. 09:00",
          },
          {
            id: "noti6",
            type: "expiration",
            title: "유통기한 알림",
            description: "체리의 유통기한이 3일 남았어요!",
            timestamp: "2025. 02. 26. 09:00",
          },
          {
            id: "noti7",
            type: "expiration",
            title: "유통기한 알림",
            description: "우유의 유통기한이 1일 남았어요!",
            timestamp: "2025. 02. 25. 09:00",
          },
          {
            id: "noti8",
            type: "reorder",
            title: "재구매 알림",
            description: "당근 살 때 안 되셨나요?",
            timestamp: "2025. 03. 01. 08:00",
          },
          {
            id: "noti9",
            type: "reorder",
            title: "재구매 알림",
            description: "당근 살 때 안 되셨나요?",
            timestamp: "2025. 03. 01. 13:00",
          },
          {
            id: "noti10",
            type: "reorder",
            title: "재구매 알림",
            description: "당근 살 때 안 되셨나요?",
            timestamp: "2025. 03. 01. 12:00",
          },
        ];

        setNotifications(mockData);
        setLoading(false);
      } catch (error) {
        console.error("알림을 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 칩 필터링
  const filteredNotifications = notifications.filter((noti) => {
    if (selectedFilter === 0) return true;
    if (selectedFilter === 1) return noti.type === "expiration";
    if (selectedFilter === 2) return noti.type === "reorder";
    return false;
  });

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="알림"
        rightIcon={close}
        onLeftClick={() => {
          window.history.back();
        }}
        onRightClick={() => {
          window.history.back();
        }}
      />
      <Chip
        items={chipItems}
        initialSelected={0}
        onSelect={setSelectedFilter}
      />

      {loading ? (
        <div className="loading">로딩 페이지</div>
      ) : (
        <NotiList notifications={filteredNotifications} />
      )}
    </>
  );
};
export default Noti;
