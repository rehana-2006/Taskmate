import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideNavTeam from "../components/SideNavTeam";

function MainLayout() {
  return (
    <div className="layout">

      <SideNavTeam />

      <div className="main">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default MainLayout;