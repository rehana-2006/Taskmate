import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideNavTeam from "../components/SideNavTeam";
import SideNavPm from "../components/SideNavPm";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout">
      {user.role === "project_manager" ? <SideNavPm /> : <SideNavTeam />}
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