import React from "react";
import "./IngredientItem.css";

const IngredientItem = ({ ingredient, onClick }) => {
  return (
    <div
      key={ingredient.id}
      className="ingredient-item"
      onClick={() => onClick(ingredient)}
      style={{
        position: "absolute",
        left: `${ingredient.x * (320 / 343)}px`, // 냉장고 비율에 맞게 조정
        width: `${ingredient.size}px`,
        height: `${ingredient.size}px`,
        cursor: "pointer",
      }}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className="ingredient-image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default IngredientItem;
