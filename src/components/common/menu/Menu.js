import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import refrigerator from "../../../assets/refrigerator.svg";
import refrigeratorActive from "../../../assets/refrigeratorActive.svg";
import card from "../../../assets/card.svg";
import cardActive from "../../../assets/cardActive.svg";
import home from "../../../assets/home.svg";
import homeActive from "../../../assets/homeActive.svg";
import mypage from "../../../assets/mypage.svg";
import mypageActive from "../../../assets/mypageActive.svg";

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "home",
      icon: home,
      activeIcon: homeActive,
      label: "홈",
      path: "/main",
    },
    {
      id: "card",
      icon: card,
      activeIcon: cardActive,
      label: "카드",
      path: "/card",
    },
    {
      id: "refrigerator",
      icon: refrigerator,
      activeIcon: refrigeratorActive,
      label: "냉장고",
      path: "/refrigeratormain",
    },
    {
      id: "mypage",
      icon: mypage,
      activeIcon: mypageActive,
      label: "마이페이지",
      path: "/mypage",
    },
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // 페이지 이동 작업
    const menuItem = menuItems.find((item) => item.id === menuId);
    // 해당 경로로 이동
    if (menuItem && menuItem.path) {
      navigate(menuItem.path);
    }
  };

  return (
    <nav className="menu-container">
      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <img
              src={activeMenu === item.id ? item.activeIcon : item.icon}
              alt={item.label}
              className="menu-icon"
            />
            <span className="menu-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
