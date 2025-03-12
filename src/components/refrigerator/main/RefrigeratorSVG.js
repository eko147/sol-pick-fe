import React from "react";
import "./RefrigeratorSVG.css";

const RefrigeratorSVG = ({ height, shelfPositions, refrigeratorRef }) => {
  return (
    <svg
      width="320"
      height={height}
      viewBox={`0 0 343 ${height}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={refrigeratorRef}
      className="refrigeratorIllust"
    >
      {/* 냉장고 외관 */}
      <rect
        x="1"
        y="1"
        width="341"
        height={height - 2}
        rx="11"
        fill="white"
        stroke="#FF8A3D"
        strokeWidth="2"
      />

      {/* 냉장고 내부 */}
      <mask id="refrigerator-mask" fill="white">
        <rect x="15" y="15" width="313" height={height - 30} rx="4" />
      </mask>
      <rect
        x="15"
        y="15"
        width="313"
        height={height - 30}
        rx="4"
        fill="#C7C7C7"
        stroke="#EEEEEE"
        strokeWidth="20"
        mask="url(#refrigerator-mask)"
      />

      {/* 내부 영역 */}
      <rect x="59" y="45" width="225" height={height - 90} fill="#EAEAEA" />

      {/* 최상단 선반 - 고정 위치 */}
      <rect x="25" y="15" width="293" height="10" fill="#EEEEEE" />
      <path d="M284 45L318 25H25L59 45H284Z" fill="#D9D9D9" />

      {/* 중간 선반들 - 동적 위치 */}
      {shelfPositions &&
        shelfPositions.slice(0, 4).map((pos, index) => (
          <g key={index}>
            <rect x="25" y={pos} width="293" height="10" fill="#EEEEEE" />
            <path
              d={`M284 ${pos - 20}L318 ${pos}H25L59 ${pos - 20}H284Z`}
              fill="#D9D9D9"
            />
          </g>
        ))}

      {/* 냉장고 바닥 - 화면 크기에 맞게 동적 배치 */}
      <path
        d={`M284 ${height - 45}L318 ${height - 25}H25L59 ${height - 45}H284Z`}
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default RefrigeratorSVG;
