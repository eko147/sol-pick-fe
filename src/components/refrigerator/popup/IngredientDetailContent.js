import React from "react";
import detailArrow from "../../../assets/detailArrow.svg";
import "./IngredientDetailContent.css";

const IngredientDetailContent = ({
  ingredient = {
    name: "식재료명 정보 없음",
    attachedImage: "/path/to/default-image.png",
    expiryDate: "유통기한 정보 없음",
    weight: "보유량 정보 없음",
    addDate: "등록일 정보 없음",
  },
}) => {
  return (
    <div className="ingpopup-description-container">
      <div className="ingpopup-description-category">
        <p className="ingmain-category">대분류</p>
        <img
          src={detailArrow}
          alt="detailArrow"
          className="ingdetailArrow-icon"
        />
        <p className="ingsub-category">중분류</p>
        <img
          src={detailArrow}
          alt="detailArrow"
          className="ingdetailArrow-icon"
        />
        <p className="ingdetail-category">소분류</p>
      </div>

      <img
        src={ingredient.attachedImage || "/path/to/default-image.png"}
        alt={ingredient.name || "식재료명 정보 없음"}
        className="ingpopup-description-image"
      />

      <div className="ingpopup-description">
        <p className="ingpopup-description-label">유통기한</p>
        <p className="ingpopup-description-expiration">
          {ingredient.expiryDate || "유통기한 정보 없음"}
        </p>
      </div>

      <div className="ingpopup-description">
        <p className="ingpopup-description-label">보유량</p>
        <p className="ingpopup-description-gram">
          {ingredient.weight || "보유량 정보 없음"}
        </p>
      </div>

      <div className="ingpopup-description">
        <p className="ingpopup-description-label">등록일</p>
        <p className="ingpopup-description-adddate">
          {ingredient.addDate || "등록일 정보 없음"}
        </p>
      </div>
    </div>
  );
};

export default IngredientDetailContent;
