import React, { useState } from "react";
import "./CardCustomDirection.css";

const CardCustomDirection = ({ onNext }) => {
  // 선택된 카드 상태 관리
  const [selectedCard, setSelectedCard] = useState(null);

  // 카드 선택 핸들러
  const handleCardSelect = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  return (
    <div className="card-custom-direction-container">
      <div className="card-custom-direction-content">
        <div className="card-direction-title">
          <h2>카드 방향 선택해 주세요</h2>
        </div>
        <div className="card-direction-underline"></div>

        <div className="card-options-container">
          {/* 가로형 카드 */}
          <div
            className={`card-option ${selectedCard === 0 ? "selected" : ""}`}
            onClick={() => handleCardSelect(0)}
          >
            <div className="direction-card-preview horizontal">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 170 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffcccc" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <rect width="170" height="100" rx="10" fill="url(#grad1)" />
              </svg>
            </div>
          </div>

          {/* 세로형 카드 */}
          <div
            className={`card-option ${selectedCard === 1 ? "selected" : ""}`}
            onClick={() => handleCardSelect(1)}
          >
            <div className="direction-card-preview vertical">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 170"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffcccc" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <rect width="100" height="170" rx="10" fill="url(#grad2)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="direction-button-cotainer">
          <button
            className="direction-selection-button"
            onClick={onNext}
            disabled={selectedCard === null}
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCustomDirection;
