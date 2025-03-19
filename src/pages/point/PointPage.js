import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PointPage.css";
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";
import CardInfo from "../../components/point/CardInfo";
import PointSummary from "../../components/point/PointSummary";
import PointHistoryList from "../../components/point/PointHistoryList";
import { authApi } from "../../api/AuthApi";
import { pointApi } from "../../api/PointApi";

const PointPage = () => {
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState(null);
  const [pointSummary, setPointSummary] = useState(null);
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 사용자 인증 확인
    if (!authApi.isAuthenticated()) {
      navigate("/login");
      return;
    }

    // 데이터 로드
    loadPointData();
  }, [navigate]);

  const loadPointData = async () => {
    setLoading(true);
    try {
      // 병렬로 데이터 가져오기
      const [cardInfoData, pointSummaryData, pointHistoryData] = await Promise.all([
        pointApi.getCardInfo(),
        pointApi.getPointSummary(),
        pointApi.getPointHistory()
      ]);

      setCardInfo(cardInfoData);
      setPointSummary(pointSummaryData);
      setPointHistory(pointHistoryData);
    } catch (err) {
      console.error("포인트 데이터 로드 오류:", err);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="point-page-wrapper">
      <Header
        title="내 카드"
      />

      <div className="point-page-container">
        {loading ? (
          <div className="loading-text">로딩 중...</div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <p>잠시 후 다시 시도해주세요.</p>
          </div>
        ) : (
          <>
            {/* 카드 정보 표시 */}
            <CardInfo cardInfo={cardInfo} />

            {/* 포인트 요약 정보 표시 */}
            <PointSummary pointSummary={pointSummary} />

            {/* 포인트 내역 표시 */}
            <div className="point-history-section">
              <h2 className="point-history-title">포인트 내역</h2>
              <PointHistoryList pointHistory={pointHistory} />
            </div>
          </>
        )}
      </div>

      <Menu />
    </div>
  );
};

export default PointPage;