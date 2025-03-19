import React, { useState, useEffect } from "react";
import "./CardCompletion.css";
import { issueCard, getCardInfo } from "../../api/CardApi";
import CardBackground1 from "../../assets/card/basicDesign.svg";
import CardBackground2 from "../../assets/card/cardBackground2.svg";
import CardBackground3 from "../../assets/card/cardBackground3.svg";
import CardBackground4 from "../../assets/card/cardBackground4.svg";
import CardBackground5 from "../../assets/card/cardBackground5.svg";

const CardCompletion = ({ onConfirm }) => {
  const [cardInfo, setCardInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardBackgrounds = {
    1: CardBackground1,
    2: CardBackground2,
    3: CardBackground3,
    4: CardBackground4,
    5: CardBackground5,
  };

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        // 로컬 스토리지에서 필요한 데이터 가져오기
        const userId = localStorage.getItem("userId");
        const designId = localStorage.getItem("cardDesignId");
        const lastName = localStorage.getItem("cardLastName");
        const firstName = localStorage.getItem("cardFirstName");

        // 필수 파라미터 확인
        if (!userId || !designId || !lastName || !firstName) {
          console.error("필수 파라미터가 누락되었습니다:", {
            userId,
            designId,
            lastName,
            firstName,
          });
          throw new Error("필수 파라미터가 누락되었습니다.");
        }

        // 카드 발급 API 호출
        await issueCard(userId, designId, lastName, firstName);

        // 카드 정보 가져오기
        const response = await getCardInfo(userId);
        // API 응답 구조에 따라 적절히 데이터 추출
        setCardInfo(response.data || response);
      } catch (error) {
        console.error("카드 정보 로딩 실패:", error);

        // 에러 발생 시 기본 디자인으로 폴백 처리도 가능
        setCardInfo({
          cardNumber: "9411 **** **** 1234",
          expiryDate: "03/28",
          cvcNumber: "123",
          firstName: localStorage.getItem("cardFirstName") || "HONG",
          lastName: localStorage.getItem("cardLastName") || "GILDONG",
          backgroundId: 1,
          stickersData: "[]",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCardInfo();
  }, []);

  if (loading) {
    return <div>카드 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="card-completion-container">
      <div className="card-completion-content">
        {/* 체크 아이콘 */}
        <div className="check-icon-container">
          <svg className="check-icon" viewBox="0 0 24 24">
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="card-completion-title">
          <h2>신한카드 쏠픽(SOL Pick)</h2>
          <h2>신청완료!</h2>
        </div>

        {/* 카드 배경 이미지 */}
        {cardInfo && (
          <div className="completion-card-preview">
            <div className="card-image">
              <img
                src={cardBackgrounds[cardInfo.backgroundId]}
                alt="카드 배경"
                className="card-background-image"
              />

              {/* 카드 정보 표시 */}
              <div className="card-info-overlay">
                <div className="card-number">{cardInfo.cardNumber}</div>
                <div className="card-info-row">
                  <div className="card-info-column">
                    <div className="card-info-label">CARD HOLDER</div>
                    <div className="card-owner-name">
                      {cardInfo.firstName} {cardInfo.lastName}
                    </div>
                  </div>
                  <div className="card-info-column">
                    <div className="card-info-label">VALID THRU</div>
                    <div className="card-expiry-value">
                      {cardInfo.expiryDate}
                    </div>
                  </div>
                  <div className="card-info-column">
                    <div className="card-info-label">CVC</div>
                    <div className="card-cvc-value">{cardInfo.cvcNumber}</div>
                  </div>
                </div>
              </div>

              {/* 스티커 표시 */}
              {JSON.parse(cardInfo.stickersData || "[]").map((sticker) => (
                <div
                  key={sticker.id}
                  className="placed-sticker"
                  style={{
                    left: `${sticker.position.x}px`,
                    top: `${sticker.position.y}px`,
                    position: "absolute",
                  }}
                >
                  {/* 여기서 스티커 이미지 또는 아이콘을 표시 */}
                  <span className="sticker-icon">
                    {/* 스티커 ID에 따른 아이콘 렌더링 로직 */}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="completion confirm-button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CardCompletion;
