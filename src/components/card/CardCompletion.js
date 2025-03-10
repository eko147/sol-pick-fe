import React from "react";
import "./CardCompletion.css";

const CardCompletion = ({ onConfirm }) => {
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

        <div className="card-preview">
          <div className="card-image"></div>
        </div>

        <button className="completion confirm-button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CardCompletion;
