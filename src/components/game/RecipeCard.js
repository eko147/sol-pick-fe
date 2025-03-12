import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ selected, onClick }) => {
  return (
    <div
      className={`recipe-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="100"
          height="100"
          fill={selected ? "#f8f5ff" : "#f0f0f0"}
        />
        <g stroke="#d0d0d0" strokeWidth="2">
          <line x1="30" y1="30" x2="70" y2="70" />
          <line x1="70" y1="30" x2="30" y2="70" />
        </g>
      </svg>
    </div>
  );
};

export default RecipeCard;
