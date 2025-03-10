import "./Header.css";

const Header = ({ leftIcon, title, rightIcon, onLeftClick, onRightClick }) => {
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
        <div className="header-title bold">{title}</div>
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
