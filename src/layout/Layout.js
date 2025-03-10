import React from "react";
import Wrapper from "./Wrapper";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      {/* 헤더 컴포넌트 */}
      <Wrapper>
        <Outlet />
      </Wrapper>
      {/* 푸터 컴포넌트 */}
    </div>
  );
};

export default Layout;
