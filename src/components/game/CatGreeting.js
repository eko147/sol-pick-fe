import React from "react";
import "./CatGreeting.css";
import rainbowCat from "../../assets/game/rainbowCat.svg";

const CatGreeting = ({ onNext }) => {
  return (
    <div className="cat-greeting-container">
      <div className="cat-greeting-content">
        <div className="cat-image-container">
          <img src={rainbowCat} alt="Rainbow Cat" className="rainbow-cat" />
        </div>
        <div className="greeting-text">집사~ 나 왔다냥!</div>
        <button className="start-button" onClick={onNext}>
          캔따개 되기
        </button>
      </div>
    </div>
  );
};

export default CatGreeting;
