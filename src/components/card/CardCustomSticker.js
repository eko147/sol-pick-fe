import React, { useState, useRef } from "react";
import "./CardCustomSticker.css";
import CardCustomPreview from "./CardCustomPreview";
import { stickers } from "./StickerData";

const CardCustomSticker = ({ onNext }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [placedStickers, setPlacedStickers] = useState([]);
  const [isDraggingFromPalette, setIsDraggingFromPalette] = useState(false);
  const [draggedStickerTypeId, setDraggedStickerTypeId] = useState(null);
  const cardPreviewRef = useRef(null);

  // 페이지 변경 핸들러
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // 스티커 종류 선택 핸들러
  const handleStickerSelect = (stickerId) => {
    setSelectedStickerId(stickerId);
  };

  // 스티커 업데이트 핸들러 (배치 또는 위치 변경)
  const handleStickerUpdate = (updatedStickers) => {
    setPlacedStickers(updatedStickers);
  };

  // 스티커 삭제 핸들러
  const handleStickerRemove = (stickerId) => {
    setPlacedStickers(
      placedStickers.filter((sticker) => sticker.id !== stickerId)
    );
  };

  // 팔레트에서 스티커 드래그 시작 핸들러
  const handlePaletteStickerDragStart = (e, stickerId) => {
    setIsDraggingFromPalette(true);
    setDraggedStickerTypeId(stickerId);

    // 드래그 이미지 설정 (브라우저마다 다르게 표시될 수 있음)
    if (e.dataTransfer && e.target) {
      e.dataTransfer.setData("text/plain", stickerId);

      // 드래그 이미지 설정을 위한 투명 엘리먼트 생성
      const dragImage = document.createElement("div");
      dragImage.style.width = "40px";
      dragImage.style.height = "40px";
      dragImage.style.background = "transparent";
      document.body.appendChild(dragImage);

      e.dataTransfer.setDragImage(dragImage, 20, 20);

      // 잠시 후 투명 엘리먼트 제거
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }

    // 드래그 중인 스티커 스타일 적용
    if (e.target) {
      e.target.classList.add("dragging");
    }
  };

  // 드래그 종료 핸들러
  const handlePaletteStickerDragEnd = (e) => {
    setIsDraggingFromPalette(false);
    setDraggedStickerTypeId(null);

    // 드래그 중 스타일 제거
    if (e.target) {
      e.target.classList.remove("dragging");
    }
  };

  // 고유 ID 생성 함수
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  // 한 페이지당 15개의 스티커 표시 (3행 x 5열)
  const stickersPerPage = 15;
  const startIndex = currentPage * stickersPerPage;
  const pageStickers = stickers.slice(startIndex, startIndex + stickersPerPage);

  return (
    <div className="card-custom-sticker-container">
      <div className="card-custom-sticker-content">
        <div className="card-sticker-title">
          <h2>원하는 스티커를 카드에 붙여주세요</h2>
        </div>
        <div className="card-sticker-underline"></div>

        {/* 카드 미리보기 */}
        <CardCustomPreview
          ref={cardPreviewRef}
          selectedStickers={placedStickers}
          onStickerUpdate={handleStickerUpdate}
          onStickerRemove={handleStickerRemove}
          selectedStickerId={selectedStickerId}
          isDraggingFromPalette={isDraggingFromPalette}
          draggedStickerTypeId={draggedStickerTypeId}
          generateId={generateId}
        />

        {/* 스티커 선택 영역 */}
        <div className="sticker-grid-container">
          <div className="sticker-grid">
            {pageStickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`sticker-item ${
                  selectedStickerId === sticker.id ? "selected" : ""
                }`}
                onClick={() => handleStickerSelect(sticker.id)}
                draggable="true"
                onDragStart={(e) =>
                  handlePaletteStickerDragStart(e, sticker.id)
                }
                onDragEnd={handlePaletteStickerDragEnd}
              >
                {sticker.icon}
              </div>
            ))}
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="page-indicator">
          <button
            className={`page-arrow ${currentPage === 0 ? "disabled" : ""}`}
            onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            &lt;
          </button>
          <div className="page-dots">
            <span
              className={`page-dot ${currentPage === 0 ? "active" : ""}`}
              onClick={() => handlePageChange(0)}
            ></span>
            <span
              className={`page-dot ${currentPage === 1 ? "active" : ""}`}
              onClick={() => handlePageChange(1)}
            ></span>
          </div>
          <button
            className={`page-arrow ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => currentPage < 1 && handlePageChange(currentPage + 1)}
            disabled={currentPage === 1}
          >
            &gt;
          </button>
        </div>
        <div className="sticker-button-container">
          <button
            className="sticker-selection-button"
            onClick={onNext}
            disabled={placedStickers.length === 0}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCustomSticker;
