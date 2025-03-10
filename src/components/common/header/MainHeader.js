import { useState } from "react";
import "./MainHeader.css";

const MainHeader = ({
  leftIcon,
  rightIcon,
  leftIconActive,
  rightIconActive,
  onLeftClick,
  onRightClick,
}) => {
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  // 왼쪽 아이콘 클릭 핸들러
  const handleLeftClick = () => {
    setIsLeftActive(!isLeftActive);
    if (onLeftClick) {
      onLeftClick();
    }
  };

  // 오른쪽 아이콘 클릭 핸들러
  const handleRightClick = () => {
    setIsRightActive(!isRightActive);
    if (onRightClick) {
      onRightClick();
    }
  };

  return (
    <header className="mainHeader-container">
      <div className="mainHeader">
        <div className="icon-container">
          {leftIcon && (
            <img
              className="mainHeader-icon"
              src={isLeftActive && leftIconActive ? leftIconActive : leftIcon}
              alt="left icon"
              onClick={handleLeftClick}
            />
          )}
          {rightIcon && (
            <img
              className="mainHeader-icon"
              src={
                isRightActive && rightIconActive ? rightIconActive : rightIcon
              }
              alt="right icon"
              onClick={handleRightClick}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
