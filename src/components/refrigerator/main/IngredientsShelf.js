import React from "react";
import IngredientItem from "./IngredientItem";
import "./IngredientsShelf.css";

const IngredientsShelf = ({
  shelfIngredients,
  position,
  onIngredientClick,
}) => {
  return (
    <div
      className="ingredients-shelf"
      style={{
        position: "absolute",
        top: `${position}px`,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {shelfIngredients.map((ingredient) => (
        <IngredientItem
          key={ingredient.id}
          ingredient={ingredient}
          onClick={onIngredientClick}
        />
      ))}
    </div>
  );
};

export default IngredientsShelf;
