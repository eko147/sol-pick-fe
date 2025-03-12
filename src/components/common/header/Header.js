import "./Header.css";

const Header = ({
  leftIcon,
  title,
  rightIcon,
  onLeftClick,
  onRightClick,
  titleStyle = {}, // 새로운 prop 추가: 제목 스타일 커스터마이징용
}) => {
  return (
    <header className="header-container">
      <div className="header">
        {leftIcon && (
          <img
            className="header-icon"
            src={leftIcon}
            alt="left icon"
            onClick={onLeftClick}
          />
        )}

        {/* style prop에 titleStyle 객체를 적용 */}
        <div className="header-title bold" style={titleStyle}>
          {title}
        </div>

        {rightIcon && (
          <img
            className="header-icon"
            src={rightIcon}
            alt="right icon"
            onClick={onRightClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
