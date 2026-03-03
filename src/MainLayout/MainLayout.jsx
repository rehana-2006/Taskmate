import React from "react";
import NewProject from "../components/NewProject";
// import {Outlet,Link} from "react-router-dom";

function MainLayout() {
  return (
    <div className="layout">
      
      <aside className="sidebar">
        <h2 className="logo">TaskMate</h2>
        <div className="newproject_btn">
          <NewProject/>
        </div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>projects</li>
            <li>My Tasks</li>
            <li>Team</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <div className="main">

        <div className="topbar">
          <input
            type="text"
            className="search-input"
            placeholder="Search project, team member, or tasks..."
          />
        </div>

        <div className="content">
          {/* <Outlet/> */}
        </div>

      </div>
    </div>
  );
}

export default MainLayout;
