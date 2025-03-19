import React from "react";
import "./CardInfo.css";

const CardInfo = ({ cardInfo }) => {
    if (!cardInfo) {
        return <div className="card-loading">카드 정보를 불러오는 중...</div>;
    }

    // 카드 정보 포맷팅
    const formatCardNumber = (number) => {
        // 마지막 4자리만 표시
        return number.slice(-4);
    };

    return (
        <div className="card-info-container">
            {/* 카드 이미지 섹션 */}
            <div className="card-image-container" style={{ backgroundImage: `url(${cardInfo.cardImageUrl || "https://via.placeholder.com/320x200/7E57C2/FFFFFF?text=SOL+PICK+Card"})` }}>
                <div className="card-details">
                    <div className="card-type">{cardInfo.cardType}</div>
                    <div className="card-number">{formatCardNumber(cardInfo.cardNumber)}</div>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;