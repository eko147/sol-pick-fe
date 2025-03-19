import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./RecipeLoading.css";
import Menu from "../../../components/common/menu/Menu";
import MainHeader from "../../../components/common/header/MainHeader";
const RecipeLoading = () => {
  const navigate = useNavigate();
  const pizzaRef = useRef(null);

  useEffect(() => {
    // 3~5초 후 자동으로 레시피 추천 페이지로 이동

    // ✅ GSAP 애니메이션 적용
    gsap.set(pizzaRef.current, { visibility: "visible" });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to([".pizzaOutline", ".pizzaMask"], {
      rotation: 360,
      transformOrigin: "22.5px 57px",
      duration: 7,
      ease: "none",
    }).to(
      ".whole",
      {
        rotation: -45,
        transformOrigin: "61px 61px",
        duration: 7,
        ease: "none",
      },
      0
    );

    gsap.globalTimeline.timeScale(4); // ✅ 전체 애니메이션 속도 4배로 조정

    return () => {
      tl.kill(); // 애니메이션 정리
    };
  }, []);

  return (
    <>
      <div className="recipe-loading-container">
        <h2>🍕 레시피를 추천 중입니다...</h2>
        <p>잠시만 기다려 주세요!</p>
        {/* SVG 피자 로딩 애니메이션 */}
        <svg
          ref={pizzaRef}
          className="pizza-animation"
          viewBox="0 0 122 122"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <g className="whole" id="pizza">
              <circle cx="61" cy="61" r="61" fill="#FFB800" />
              <circle cx="61" cy="61" r="55" fill="#FFDE31" />
              <g
                fill="#CD2D36"
                stroke="#FEA202"
                strokeMiterlimit="10"
                strokeWidth="2"
              >
                <circle cx="61" cy="29.11" r="8" />
                <circle cx="38.45" cy="38.45" r="8" />
                <circle cx="29.11" cy="61" r="8" />
                <circle cx="38.45" cy="83.55" r="8" />
                <circle cx="61" cy="92.89" r="8" />
                <circle cx="83.55" cy="83.55" r="8" />
                <circle cx="92.89" cy="61" r="8" />
                <circle cx="83.55" cy="38.45" r="8" />
              </g>
              <circle
                cx="61"
                cy="61"
                r="48.2"
                fill="none"
                stroke="#FEA202"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeDasharray="16 10 8 4"
              />
              <circle
                cx="61"
                cy="60.8"
                r="8"
                fill="#CD2D36"
                stroke="#FEA202"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </g>
            <path
              id="sliceOutline"
              d="M62.94,61.63,82.68,9a2.51,2.51,0,0,0-1.41-3C72,.8,50,.8,40.63,5.9a2.46,2.46,0,0,0-1.34,3L59.06,61.63A2.07,2.07,0,0,0,62.94,61.63Z"
            />
            <mask id="pizzaMask">
              <use
                className="pizzaMask"
                xlinkHref="#sliceOutline"
                x="0%"
                y="0%"
                fill="#FFF"
                stroke="#FFF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </mask>
          </defs>
          <g mask="url(#pizzaMask)">
            <use xlinkHref="#pizza" x="0%" y="0%" />
          </g>
          <use
            className="pizzaOutline"
            xlinkHref="#sliceOutline"
            x="0%"
            y="0%"
            fill="none"
            stroke="#FEA202"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <Menu />
      </div>
    </>
  );
};

export default RecipeLoading;
