import React from "react";

// 30개의 음식 관련 스티커 SVG 아이콘 정의
export const stickers = [
  // 첫 번째 페이지 (15개)
  {
    id: 1,
    name: "Pizza",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35,20C35,28.3 28.3,35 20,35C11.7,35 5,28.3 5,20C5,11.7 11.7,5 20,5C28.3,5 35,11.7 35,20Z"
          fill="#FFCC7E"
        />
        <path
          d="M35,20C35,11.7 28.3,5 20,5C11.7,5 5,11.7 5,20L20,35C28.3,35 35,28.3 35,20Z"
          fill="#FFA94D"
        />
        <path
          d="M20,5C11.7,5 5,11.7 5,20L20,35L35,20C35,11.7 28.3,5 20,5Z"
          stroke="#CC5C00"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="14" r="2" fill="#CC0000" />
        <circle cx="24" cy="18" r="2" fill="#CC0000" />
        <circle cx="18" cy="23" r="2" fill="#CC0000" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Salad",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,15H30V28C30,32 26,35 20,35C14,35 10,32 10,28V15Z"
          fill="#64D16A"
        />
        <path
          d="M10,15H30V28C30,32 26,35 20,35C14,35 10,32 10,28V15Z"
          stroke="#0F7A13"
          strokeWidth="1.5"
        />
        <path d="M12,15C12,11 15,8 20,8C25,8 28,11 28,15H12Z" fill="#0F7A13" />
        <path
          d="M12,15C12,11 15,8 20,8C25,8 28,11 28,15H12Z"
          stroke="#0F7A13"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="20" r="2" fill="#FF6B6B" />
        <circle cx="24" cy="22" r="2" fill="#FF6B6B" />
        <circle cx="20" cy="26" r="2" fill="#FF6B6B" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Pizza Round",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="15" fill="#FFD580" />
        <circle cx="20" cy="20" r="15" stroke="#B25E00" strokeWidth="1.5" />
        <circle cx="15" cy="15" r="2" fill="#FF6347" />
        <circle cx="25" cy="20" r="2" fill="#FF6347" />
        <circle cx="17" cy="25" r="2" fill="#FF6347" />
        <path d="M10,20L30,20" stroke="#B25E00" strokeWidth="1" />
        <path d="M20,10L20,30" stroke="#B25E00" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Chicken",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32,20C32,20 28,30 20,30C12,30 8,20 8,20C8,20 12,10 20,10C28,10 32,20 32,20Z"
          fill="#FFB74D"
        />
        <path
          d="M32,20C32,20 28,30 20,30C12,30 8,20 8,20C8,20 12,10 20,10C28,10 32,20 32,20Z"
          stroke="#B25D00"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="18" r="2" fill="#8D4600" />
        <circle cx="24" cy="18" r="2" fill="#8D4600" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Sushi",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="15" width="20" height="10" rx="5" fill="#FFFFFF" />
        <rect
          x="10"
          y="15"
          width="20"
          height="10"
          rx="5"
          stroke="#555555"
          strokeWidth="1.5"
        />
        <rect x="12" y="17" width="16" height="6" rx="3" fill="#FF6B6B" />
        <rect x="16" y="18" width="8" height="4" rx="2" fill="#000000" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Hamburger",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,20C10,17.2 14.5,15 20,15C25.5,15 30,17.2 30,20V25C30,27.8 25.5,30 20,30C14.5,30 10,27.8 10,25V20Z"
          fill="#FFD580"
        />
        <path
          d="M10,20C10,17.2 14.5,15 20,15C25.5,15 30,17.2 30,20"
          stroke="#B25D00"
          strokeWidth="1.5"
        />
        <path d="M10,20H30" stroke="#B25D00" strokeWidth="1.5" />
        <path
          d="M10,25C10,27.8 14.5,30 20,30C25.5,30 30,27.8 30,25V20"
          stroke="#B25D00"
          strokeWidth="1.5"
        />
        <path
          d="M10,15C10,12.2 14.5,10 20,10C25.5,10 30,12.2 30,15C30,17.8 25.5,20 20,20C14.5,20 10,17.8 10,15Z"
          fill="#D98500"
        />
        <path
          d="M10,15C10,12.2 14.5,10 20,10C25.5,10 30,12.2 30,15C30,17.8 25.5,20 20,20C14.5,20 10,17.8 10,15Z"
          stroke="#B25D00"
          strokeWidth="1.5"
        />
        <path
          d="M10,25C10,22.2 14.5,20 20,20C25.5,20 30,22.2 30,25C30,27.8 25.5,30 20,30C14.5,30 10,27.8 10,25Z"
          fill="#D98500"
        />
        <path
          d="M10,25C10,22.2 14.5,20 20,20C25.5,20 30,22.2 30,25C30,27.8 25.5,30 20,30C14.5,30 10,27.8 10,25Z"
          stroke="#B25D00"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 7,
    name: "Coffee",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12,15H26V28C26,30.2091 23.3137,32 20,32C16.6863,32 14,30.2091 14,28V15H12Z"
          fill="#8B4513"
        />
        <path
          d="M12,15H26V28C26,30.2091 23.3137,32 20,32C16.6863,32 14,30.2091 14,28V15H12Z"
          stroke="#5E2F0D"
          strokeWidth="1.5"
        />
        <path d="M14,15H26V18H14V15Z" fill="#5E2F0D" />
        <path
          d="M26,15H28C29.1046,15 30,15.8954 30,17V19C30,20.1046 29.1046,21 28,21H26"
          stroke="#5E2F0D"
          strokeWidth="1.5"
        />
        <path
          d="M12,12C12,10.8954 12.8954,10 14,10H26C27.1046,10 28,10.8954 28,12V15H12V12Z"
          fill="#D3D3D3"
        />
        <path
          d="M12,12C12,10.8954 12.8954,10 14,10H26C27.1046,10 28,10.8954 28,12V15H12V12Z"
          stroke="#5E2F0D"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 8,
    name: "Sandwich",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8,12H32V16H8V12Z" fill="#FFD580" />
        <path d="M8,12H32V16H8V12Z" stroke="#B25D00" strokeWidth="1.5" />
        <path d="M8,16H32V24H8V16Z" fill="#78DE87" />
        <path d="M8,16H32V24H8V16Z" stroke="#2F9A3D" strokeWidth="1.5" />
        <path d="M8,24H32V28H8V24Z" fill="#FFD580" />
        <path d="M8,24H32V28H8V24Z" stroke="#B25D00" strokeWidth="1.5" />
        <circle cx="14" cy="20" r="2" fill="#FF6347" />
        <circle cx="20" cy="20" r="2" fill="#FF6347" />
        <circle cx="26" cy="20" r="2" fill="#FF6347" />
      </svg>
    ),
  },
  {
    id: 9,
    name: "Cheese",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8,15L32,15L32,30L8,30L8,15Z" fill="#FFC234" />
        <path
          d="M8,15L32,15L32,30L8,30L8,15Z"
          stroke="#CC9900"
          strokeWidth="1.5"
        />
        <path d="M8,15L32,10L32,15L8,15Z" fill="#FFDB70" />
        <path d="M8,15L32,10L32,15L8,15Z" stroke="#CC9900" strokeWidth="1.5" />
        <circle cx="14" cy="20" r="1.5" fill="#FFDB70" />
        <circle cx="24" cy="22" r="1.5" fill="#FFDB70" />
        <circle cx="18" cy="25" r="1.5" fill="#FFDB70" />
        <circle cx="28" cy="26" r="1.5" fill="#FFDB70" />
      </svg>
    ),
  },
  {
    id: 10,
    name: "Pizza Slice",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10,30L20,10L30,30H10Z" fill="#FFCC7E" />
        <path d="M10,30L20,10L30,30H10Z" stroke="#CC5C00" strokeWidth="1.5" />
        <path d="M10,30H30" stroke="#CC5C00" strokeWidth="1.5" />
        <circle cx="20" cy="18" r="2" fill="#CC0000" />
        <circle cx="16" cy="24" r="2" fill="#CC0000" />
        <circle cx="24" cy="24" r="2" fill="#CC0000" />
      </svg>
    ),
  },
  {
    id: 11,
    name: "Donut",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="12" fill="#FFA7D1" />
        <circle cx="20" cy="20" r="12" stroke="#FF66A3" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="5" fill="#FFFFFF" />
        <circle cx="20" cy="20" r="5" stroke="#FF66A3" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="1" fill="#FFFFFF" />
        <circle cx="24" cy="16" r="1" fill="#FFFFFF" />
        <circle cx="24" cy="24" r="1" fill="#FFFFFF" />
        <circle cx="16" cy="26" r="1" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 12,
    name: "Sushi Roll",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="10" fill="#FFFFFF" />
        <circle cx="20" cy="20" r="10" stroke="#555555" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="7" fill="#FF6B6B" />
        <circle cx="20" cy="20" r="7" stroke="#555555" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="#000000" />
      </svg>
    ),
  },
  {
    id: 13,
    name: "Bowl",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,20C10,14.5 14.5,10 20,10C25.5,10 30,14.5 30,20V25C30,27.8 25.5,30 20,30C14.5,30 10,27.8 10,25V20Z"
          fill="#F0F0F0"
        />
        <path
          d="M10,20C10,14.5 14.5,10 20,10C25.5,10 30,14.5 30,20V25C30,27.8 25.5,30 20,30C14.5,30 10,27.8 10,25V20Z"
          stroke="#333333"
          strokeWidth="1.5"
        />
        <path
          d="M13,20C13,16.1 16.1,13 20,13C23.9,13 27,16.1 27,20"
          stroke="#555555"
          strokeWidth="1"
        />
        <path d="M12,22H28" stroke="#555555" strokeWidth="1" />
        <path
          d="M14,18L17,24"
          stroke="#FF6347"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20,17L20,25"
          stroke="#78DE87"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M26,18L23,24"
          stroke="#FF6347"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 14,
    name: "French Fries",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12,12L12,30L28,30L28,12L12,12Z" fill="#D40000" />
        <path
          d="M12,12L12,30L28,30L28,12L12,12Z"
          stroke="#AA0000"
          strokeWidth="1.5"
        />
        <path
          d="M15,10L15,27"
          stroke="#FFD700"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M19,8L19,29"
          stroke="#FFD700"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M23,9L23,28"
          stroke="#FFD700"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M27,11L27,26"
          stroke="#FFD700"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 15,
    name: "Bread",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8,15C8,12.2386 12.0294,10 17,10H23C27.9706,10 32,12.2386 32,15V25C32,27.7614 27.9706,30 23,30H17C12.0294,30 8,27.7614 8,25V15Z"
          fill="#E8C39E"
        />
        <path
          d="M8,15C8,12.2386 12.0294,10 17,10H23C27.9706,10 32,12.2386 32,15V25C32,27.7614 27.9706,30 23,30H17C12.0294,30 8,27.7614 8,25V15Z"
          stroke="#AA8B74"
          strokeWidth="1.5"
        />
        <circle cx="15" cy="18" r="1.5" fill="#AA8B74" />
        <circle cx="25" cy="18" r="1.5" fill="#AA8B74" />
        <circle cx="20" cy="22" r="1.5" fill="#AA8B74" />
      </svg>
    ),
  },
  // 두 번째 페이지 (15개)
  {
    id: 16,
    name: "Strawberry",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,12C16,12 14,15 14,18C12,18 10,20 10,24C10,28 12,31 20,31C28,31 30,28 30,24C30,20 28,18 26,18C26,15 24,12 20,12Z"
          fill="#FF3B3B"
        />
        <path
          d="M20,12C16,12 14,15 14,18C12,18 10,20 10,24C10,28 12,31 20,31C28,31 30,28 30,24C30,20 28,18 26,18C26,15 24,12 20,12Z"
          stroke="#CC0000"
          strokeWidth="1.5"
        />
        <path d="M17,13C18,11 22,11 23,13" stroke="#00AA00" strokeWidth="1.5" />
        <circle cx="16" cy="20" r="1" fill="#FFFFFF" />
        <circle cx="21" cy="23" r="1" fill="#FFFFFF" />
        <circle cx="17" cy="26" r="1" fill="#FFFFFF" />
        <circle cx="24" cy="20" r="1" fill="#FFFFFF" />
        <circle cx="24" cy="26" r="1" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 17,
    name: "Lemon",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="20"
          cy="20"
          rx="12"
          ry="9"
          transform="rotate(45 20 20)"
          fill="#FFEF00"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="12"
          ry="9"
          transform="rotate(45 20 20)"
          stroke="#BFB200"
          strokeWidth="1.5"
        />
        <path d="M15,15L25,25" stroke="#BFB200" strokeWidth="1" />
        <path d="M15,25L25,15" stroke="#BFB200" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 18,
    name: "Watermelon",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,20C10,13.9 14.5,9 20,9C25.5,9 30,13.9 30,20L20,30L10,20Z"
          fill="#4CAF50"
        />
        <path
          d="M10,20C10,13.9 14.5,9 20,9C25.5,9 30,13.9 30,20L20,30L10,20Z"
          stroke="#388E3C"
          strokeWidth="1.5"
        />
        <path d="M12,20L20,28L28,20" fill="#FF5252" />
        <path d="M12,20L20,28L28,20" stroke="#FF5252" strokeWidth="1.5" />
        <circle cx="16" cy="20" r="1" fill="#000000" />
        <circle cx="20" cy="24" r="1" fill="#000000" />
        <circle cx="24" cy="20" r="1" fill="#000000" />
      </svg>
    ),
  },
  {
    id: 19,
    name: "Croissant",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15,12C11,12 9,14 9,18C9,24 15,31 22,31C26,31 31,29 31,24C31,18 27,15 24,15C22,12 19,12 15,12Z"
          fill="#FFD98E"
        />
        <path
          d="M15,12C11,12 9,14 9,18C9,24 15,31 22,31C26,31 31,29 31,24C31,18 27,15 24,15C22,12 19,12 15,12Z"
          stroke="#D6A657"
          strokeWidth="1.5"
        />
        <path d="M13,16L27,24" stroke="#D6A657" strokeWidth="1" />
        <path d="M17,12L28,19" stroke="#D6A657" strokeWidth="1" />
        <path d="M10,22L19,29" stroke="#D6A657" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 20,
    name: "Ice Cream",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15,14C15,11.2386 17.2386,9 20,9C22.7614,9 25,11.2386 25,14C25,16.7614 22.7614,19 20,19C17.2386,19 15,16.7614 15,14Z"
          fill="#FFAFC0"
        />
        <path
          d="M15,14C15,11.2386 17.2386,9 20,9C22.7614,9 25,11.2386 25,14C25,16.7614 22.7614,19 20,19C17.2386,19 15,16.7614 15,14Z"
          stroke="#FF8DA1"
          strokeWidth="1.5"
        />
        <path d="M17,19L14,31H26L23,19" fill="#F5D7A1" />
        <path d="M17,19L14,31H26L23,19" stroke="#DAB978" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 21,
    name: "Cookies",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="12" fill="#C19A65" />
        <circle cx="20" cy="20" r="12" stroke="#8B6B42" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="#4A2C03" />
        <circle cx="24" cy="18" r="2" fill="#4A2C03" />
        <circle cx="18" cy="24" r="2" fill="#4A2C03" />
      </svg>
    ),
  },
  {
    id: 22,
    name: "Taco",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,20C10,14 14,10 20,10C26,10 30,14 30,20C30,26 14,30 10,20Z"
          fill="#FFCE54"
        />
        <path
          d="M10,20C10,14 14,10 20,10C26,10 30,14 30,20C30,26 14,30 10,20Z"
          stroke="#F6BB42"
          strokeWidth="1.5"
        />
        <path d="M12,18C12,18 14,24 20,24C26,24 28,18 28,18" fill="#A0D468" />
        <path
          d="M12,18C12,18 14,24 20,24C26,24 28,18 28,18"
          stroke="#8CC152"
          strokeWidth="1.5"
        />
        <path
          d="M14,15L26,15"
          stroke="#ED5565"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 23,
    name: "Cupcake",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12,18H28V22C28,26 24,28 20,28C16,28 12,26 12,22V18Z"
          fill="#AC8E68"
        />
        <path
          d="M12,18H28V22C28,26 24,28 20,28C16,28 12,26 12,22V18Z"
          stroke="#8B6B42"
          strokeWidth="1.5"
        />
        <path
          d="M12,15C12,12.2 15.5,10 20,10C24.5,10 28,12.2 28,15C28,17.8 24.5,20 20,20C15.5,20 12,17.8 12,15Z"
          fill="#FFAFC0"
        />
        <path
          d="M12,15C12,12.2 15.5,10 20,10C24.5,10 28,12.2 28,15C28,17.8 24.5,20 20,20C15.5,20 12,17.8 12,15Z"
          stroke="#FF8DA1"
          strokeWidth="1.5"
        />
        <circle cx="17" cy="14" r="1" fill="#FFFFFF" />
        <circle cx="23" cy="14" r="1" fill="#FFFFFF" />
        <circle cx="20" cy="16" r="1" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 24,
    name: "Avocado",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="20" cy="20" rx="10" ry="12" fill="#43A047" />
        <ellipse
          cx="20"
          cy="20"
          rx="10"
          ry="12"
          stroke="#2E7D32"
          strokeWidth="1.5"
        />
        <ellipse cx="20" cy="20" rx="5" ry="7" fill="#FFF176" />
        <ellipse
          cx="20"
          cy="20"
          rx="5"
          ry="7"
          stroke="#FBC02D"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="20" r="3" fill="#795548" />
        <circle cx="20" cy="20" r="3" stroke="#5D4037" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 25,
    name: "Carrot",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,8L28,16C28,16 32,24 24,32C16,40 8,28 8,28L16,20L20,8Z"
          fill="#FF7043"
        />
        <path
          d="M20,8L28,16C28,16 32,24 24,32C16,40 8,28 8,28L16,20L20,8Z"
          stroke="#E64A19"
          strokeWidth="1.5"
        />
        <path d="M20,8C20,8 18,3 23,3C28,3 26,8 26,8" fill="#4CAF50" />
        <path
          d="M20,8C20,8 18,3 23,3C28,3 26,8 26,8"
          stroke="#388E3C"
          strokeWidth="1.5"
        />
        <path d="M14,23L19,18" stroke="#E64A19" strokeWidth="1" />
        <path d="M19,28L24,23" stroke="#E64A19" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 26,
    name: "Popsicle",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="15" y="10" width="10" height="15" rx="2" fill="#FF5252" />
        <rect
          x="15"
          y="10"
          width="10"
          height="15"
          rx="2"
          stroke="#D32F2F"
          strokeWidth="1.5"
        />
        <path d="M18,25L17,33H23L22,25H18Z" fill="#CDDC39" />
        <path
          d="M18,25L17,33H23L22,25H18Z"
          stroke="#AFB42B"
          strokeWidth="1.5"
        />
        <path d="M17,14H23" stroke="#D32F2F" strokeWidth="1" />
        <path d="M17,18H23" stroke="#D32F2F" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 27,
    name: "Pancakes",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="20" cy="13" rx="10" ry="3" fill="#FFD54F" />
        <ellipse
          cx="20"
          cy="13"
          rx="10"
          ry="3"
          stroke="#FFA000"
          strokeWidth="1.5"
        />
        <ellipse cx="20" cy="18" rx="10" ry="3" fill="#FFD54F" />
        <ellipse
          cx="20"
          cy="18"
          rx="10"
          ry="3"
          stroke="#FFA000"
          strokeWidth="1.5"
        />
        <ellipse cx="20" cy="23" rx="10" ry="3" fill="#FFD54F" />
        <ellipse
          cx="20"
          cy="23"
          rx="10"
          ry="3"
          stroke="#FFA000"
          strokeWidth="1.5"
        />
        <path d="M16,10C15,9 24,8 24,10" stroke="#FFA000" strokeWidth="1" />
        <path d="M17,28C17,28 18,30 20,31C22,32 23,31 23,31" fill="#FFC107" />
        <path
          d="M17,28C17,28 18,30 20,31C22,32 23,31 23,31"
          stroke="#FFA000"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 28,
    name: "Egg",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="20" cy="22" rx="10" ry="12" fill="#FFFFFF" />
        <ellipse
          cx="20"
          cy="22"
          rx="10"
          ry="12"
          stroke="#BDBDBD"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="22" r="5" fill="#FFC107" />
        <circle cx="20" cy="22" r="5" stroke="#FFA000" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 29,
    name: "Popcorn",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12,16H28V30H12V16Z" fill="#D32F2F" />
        <path d="M12,16H28V30H12V16Z" stroke="#B71C1C" strokeWidth="1.5" />
        <path
          d="M12,16C12,16 12,14 15,13C18,12 17,10 20,10C23,10 22,12 25,13C28,14 28,16 28,16H12Z"
          fill="#F5F5F5"
        />
        <path
          d="M12,16C12,16 12,14 15,13C18,12 17,10 20,10C23,10 22,12 25,13C28,14 28,16 28,16H12Z"
          stroke="#BDBDBD"
          strokeWidth="1.5"
        />
        <path d="M16,16L14,30" stroke="#B71C1C" strokeWidth="1" />
        <path d="M20,16L20,30" stroke="#B71C1C" strokeWidth="1" />
        <path d="M24,16L26,30" stroke="#B71C1C" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 30,
    name: "Bento Box",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="12" width="24" height="16" rx="2" fill="#795548" />
        <rect
          x="8"
          y="12"
          width="24"
          height="16"
          rx="2"
          stroke="#5D4037"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="12"
          x2="20"
          y2="28"
          stroke="#5D4037"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="20"
          x2="32"
          y2="20"
          stroke="#5D4037"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="16" r="3" fill="#FFCA28" />
        <circle cx="26" cy="16" r="3" fill="#FFFFFF" />
        <rect x="11" y="22" width="6" height="4" rx="1" fill="#4CAF50" />
        <rect x="23" y="22" width="6" height="4" rx="1" fill="#F44336" />
      </svg>
    ),
  },
];
