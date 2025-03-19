import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";
import backArrow from "../../../assets/backArrow.svg";
import Header from "../../../components/common/header/Header";
import Menu from "../../../components/common/menu/Menu";
import axios from "axios";
import MainHeader from "../../../components/common/header/MainHeader";
import { useState, useEffect } from "react";
const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <p>레시피 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <>
      <MainHeader />
      <Header
        leftIcon={backArrow}
        title={recipe.name} // ✅ 레시피 제목
        onLeftClick={() => navigate(-1)}
      />
      <div className="recipe-detail-container">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-detail-image"
        />
        {/* ✅ 조리 정보 */}
        <div className="recipe-info">
          <p>
            <strong>⏳ 조리 시간:</strong> {recipe.cooking_time || "알 수 없음"}
          </p>
          <p>
            <strong>🔥 난이도:</strong> {recipe.difficulty || "알 수 없음"}
          </p>
        </div>
        ✅ 필요한 재료 목록
        <h3>🥕 필요한 재료</h3>
        <ul className="ingredient-list">
          {recipe.ingredients.split(", ").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>👨‍🍳 조리 방법</h3>
        <ol className="cooking-steps">
          {Array.isArray(recipe.steps) ? (
            recipe.steps.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <p>❌ 조리 방법 정보가 없습니다.</p>
          )}
        </ol>
        <Menu />
      </div>
    </>
  );
};

export default RecipeDetail;
