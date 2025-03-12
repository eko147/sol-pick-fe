import React from "react";
import "./RefrigeratorSVGv2.css";

// 기존 RefrigeratorSVG에서 선반 하나만 추가한 간단한 버전
const RefrigeratorSVG2 = ({ height, refrigeratorRef }) => {
  // SVG 비율 계산
  const originalHeight = 644;
  const heightRatio = height / originalHeight;

  // 기존 선반 위치 (SVG에서 정의된 값 그대로 사용)
  const shelfPositions = [116, 217, 318, 419, 520, 601];

  return (
    <svg
      width="320"
      height={height}
      viewBox={`0 0 320 ${height}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={refrigeratorRef}
      className="v2-refrigeratorIllust"
    >
      <rect
        width="320"
        height={height}
        rx="20"
        fill="url(#paint0_linear_0_1)"
      />
      <mask id="path-2-inside-1_0_1" fill="white">
        <rect x="10" y="10" width="300" height={height - 20} rx="12" />
      </mask>
      <rect
        x="10"
        y="10"
        width="300"
        height={height - 20}
        rx="12"
        fill="url(#paint1_linear_0_1)"
        stroke="white"
        strokeWidth="30"
        mask="url(#path-2-inside-1_0_1)"
      />
      <rect x="56" y="43" width="208" height={height - 86} fill="#EAEAEA" />

      {/* 선반들 */}
      {shelfPositions.slice(0, 5).map((pos, index) => (
        <rect
          key={`shelf-${index}`}
          x="28"
          y={Math.round(pos * heightRatio)}
          width="264"
          height="10"
          fill="#EEEEEE"
        />
      ))}

      {/* 상단 효과 */}
      <path d="M264 43L295 25H25L56 43H264Z" fill="url(#paint2_linear_0_1)" />

      {/* 선반 효과 */}
      <path
        d={`M264.001 ${Math.round(98 * heightRatio)}L292 ${Math.round(
          116 * heightRatio
        )}H28L56.0006 ${Math.round(98 * heightRatio)}H264.001Z`}
        fill="url(#paint4_linear_0_1)"
      />
      <path
        d={`M264.001 ${Math.round(199 * heightRatio)}L292 ${Math.round(
          217 * heightRatio
        )}H28L56.0006 ${Math.round(199 * heightRatio)}H264.001Z`}
        fill="url(#paint5_linear_0_1)"
      />
      <path
        d={`M264.001 ${Math.round(300 * heightRatio)}L292 ${Math.round(
          318 * heightRatio
        )}H28L56.0006 ${Math.round(300 * heightRatio)}H264.001Z`}
        fill="url(#paint6_linear_0_1)"
      />
      <path
        d={`M264.001 ${Math.round(401 * heightRatio)}L292 ${Math.round(
          419 * heightRatio
        )}H28L56.0006 ${Math.round(401 * heightRatio)}H264.001Z`}
        fill="url(#paint7_linear_0_1)"
      />
      <path
        d={`M264.001 ${Math.round(502 * heightRatio)}L292 ${Math.round(
          520 * heightRatio
        )}H28L56.0006 ${Math.round(502 * heightRatio)}H264.001Z`}
        fill="url(#paint8_linear_0_1)"
      />

      {/* 바닥 효과 - 테두리에 딱 붙도록 조정 */}
      <path
        d={`M264 ${height - 43}L295 ${height - 25}H25L56 ${height - 43}H264Z`}
        fill="url(#paint3_linear_0_1)"
      />

      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="160"
          y1="0"
          x2="160"
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#E07129" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="160"
          y1="10"
          x2="160"
          y2={height - 10}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_1"
          x1="160"
          y1="25"
          x2="160"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_0_1"
          x1="160"
          y1={height - 25}
          x2="160"
          y2={height - 43}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_0_1"
          x1="160"
          y1={Math.round(116 * heightRatio)}
          x2="160"
          y2={Math.round(98 * heightRatio)}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_0_1"
          x1="160"
          y1={Math.round(217 * heightRatio)}
          x2="160"
          y2={Math.round(199 * heightRatio)}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_0_1"
          x1="160"
          y1={Math.round(318 * heightRatio)}
          x2="160"
          y2={Math.round(300 * heightRatio)}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_0_1"
          x1="160"
          y1={Math.round(419 * heightRatio)}
          x2="160"
          y2={Math.round(401 * heightRatio)}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_0_1"
          x1="160"
          y1={Math.round(520 * heightRatio)}
          x2="160"
          y2={Math.round(502 * heightRatio)}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E0E0" />
          <stop offset="1" stopColor="#C7C7C7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RefrigeratorSVG2;
