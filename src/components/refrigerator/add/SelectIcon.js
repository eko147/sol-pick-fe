import React, { useState, useRef, useEffect } from "react";
import selectArrow from "../../../assets/selectArrow.svg";
import selectArrowActive from "../../../assets/selectArrowActive.svg";
import "./SelectIcon.css";

// 기본 이모지 세트 (필요에 따라 확장 가능)
const DEFAULT_EMOJIS = [
  // 과일류
  "🍎",
  "🍏",
  "🍊",
  "🍐",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍈",
  "🍍",
  "🥝",
  "🥭",
  "🍒",
  "🍑",
  "🍅",
  "🥥",
  "🥑",

  // 채소류
  "🥦",
  "🥬",
  "🥒",
  "🌶️",
  "🥕",
  "🥔",
  "🍠",
  "🍆",
  "🌽",
  "🥗",
  "🥜",
  "🌰",
  "🧅",
  "🧄",
  "🍄",

  // 육류 및 해산물
  "🍗",
  "🍖",
  "🥩",
  "🥓",
  "🐟",
  "🐠",
  "🦐",
  "🦀",
  "🦞",
  "🦑",
  "🐙",
  "🦪",
  "🍤",
  "🍢",

  // 유제품
  "🥛",
  "🧀",
  "🧈",
  "🥚",

  // 곡물 및 빵
  "🍞",
  "🥐",
  "🥖",
  "🥨",
  "🥯",
  "🥙",
  "🌯",
  "🌮",
  "🥪",
  "🍚",
  "🍜",
  "🍝",
  "🍣",
  "🍱",
  "🥫",
  "🥣",
  "🍛",
  "🍲",
  "🥧",
  "🍳",
  "🥘",
  "🍘",
  "🍙",
  "🥟",

  // 간식 및 디저트
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🍿",
  "🍩",
  "🍪",
  "🍰",
  "🧁",
  "🧇",
  "🍮",
  "🍧",
  "🍨",
  "🍦",
  "🍭",
  "🍬",
  "🍫",
  "🎂",
  "🥞",
  "🍡",
  "🥮",
  "🥠",

  // 음료
  "🍵",
  "🍶",
  "🍷",
  "🍸",
  "🍹",
  "🍺",
  "🍾",
  "🥂",
  "🥃",
  "🧃",
  "🥤",
  "🍼",
  "🧊",

  // 기타
  "🧂",
  "🍯",
  "🦴",
];

const SelectIcon = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEmojiSelect = (emoji) => {
    onChange(emoji);
    setIsOpen(false);
  };

  return (
    <div className={`select-icon-container ${className}`} ref={dropdownRef}>
      <div className="select-icon" tabIndex="0" onClick={toggleDropdown}>
        <span>{value || "🍎"}</span>
      </div>

      <img
        src={isOpen ? selectArrowActive : selectArrow}
        alt="Select"
        className="select-icon-arrow"
      />

      {isOpen && (
        <div className="select-icon-dropdown">
          {DEFAULT_EMOJIS.map((emoji, index) => (
            <div
              key={index}
              className="select-icon-dropdown-item"
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectIcon;
