import { useMemo } from "react";
import NotiItem from "./NotiItem";
import "./NotiList.css";

const NotiList = ({ notifications = [] }) => {
  // 날짜별로 알림 그룹화
  const groupedNotifications = useMemo(() => {
    // 오늘, 어제 날짜 계산
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 날짜를 YYYY. MM. DD. 형식으로 변환하는 함수 (마침표 포함)
    function formatYMD(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}. ${month}. ${day}.`;
    }

    const todayString = formatYMD(today);
    const yesterdayString = formatYMD(yesterday);

    // 날짜별로 그룹화
    const groups = {};

    notifications.forEach((noti) => {
      // 타임스탬프에서 날짜 부분만 올바르게 추출 (YYYY. MM. DD.)
      const dateParts = noti.timestamp.split(" ");
      // 이중 마침표를 방지하기 위해 마지막 마침표를 제거하고 다시 추가
      const datePart = dateParts.slice(0, 3).join(" ").replace(/\.$/, "") + ".";

      // 표시용 날짜 결정
      let displayDate;

      // "오늘", "어제" 정확한 문자열 비교
      if (datePart === todayString) {
        displayDate = "오늘";
      } else if (datePart === yesterdayString) {
        displayDate = "어제";
      } else {
        displayDate = datePart;
      }

      // 그룹에 추가
      if (!groups[displayDate]) {
        groups[displayDate] = [];
      }
      groups[displayDate].push(noti);
    });

    // 각 그룹 내에서 시간별로 알림 정렬 (최신순)
    for (const date in groups) {
      groups[date].sort((a, b) => {
        // 시간 부분 추출 (HH:MM)
        const timeA = a.timestamp.split(" ").pop();
        const timeB = b.timestamp.split(" ").pop();

        // 시간과 분을 숫자로 변환
        const [hoursA, minutesA] = timeA.split(":").map(Number);
        const [hoursB, minutesB] = timeB.split(":").map(Number);

        // 시간 비교
        if (hoursA !== hoursB) {
          return hoursB - hoursA; // 시간 내림차순
        }
        // 분 비교
        return minutesB - minutesA; // 분 내림차순
      });
    }

    // 날짜별로 정렬 (최신순)
    return Object.entries(groups).sort((a, b) => {
      if (a[0] === "오늘") return -1;
      if (b[0] === "오늘") return 1;
      if (a[0] === "어제") return -1;
      if (b[0] === "어제") return 1;

      // 날짜 형식일 경우 역순으로 정렬
      const dateA = a[0].split(". ").map((n) => parseInt(n || "0"));
      const dateB = b[0].split(". ").map((n) => parseInt(n || "0"));

      // 연도 비교
      if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
      // 월 비교
      if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1];
      // 일 비교
      return dateB[2] - dateA[2];
    });
  }, [notifications]);

  if (notifications.length === 0) {
    return <div className="noti-empty">새로운 알림이 없습니다.</div>;
  }

  return (
    <div className="noti-list">
      {groupedNotifications.map(([date, notis], groupIndex) => (
        <div key={date} className="noti-group">
          <div className="noti-date">{date}</div>
          {notis.map((noti, index) => (
            <NotiItem
              key={noti.id || `${date}-${index}`}
              type={noti.type}
              title={noti.title}
              description={noti.description}
              timestamp={noti.timestamp}
              showDate={false} // 이미 그룹 상단에 날짜가 표시되므로 개별 아이템엔 표시하지 않음
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotiList;
