import React from "react";
import NewProject from "../components/NewProject";
import {Outlet,Link} from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="layout">
      
      <aside className="sidebar">
        <h2 className="logo">TaskMate</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li> <Link to="/mytasks"> My Tasks</Link></li>
            <li><Link to="/board">Board View</Link></li>
            <li>Team</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <div className="main">
        
        <div>
          <Navbar/>
        </div>
        <div className="content">
          <Outlet/>
        </div>

      </div>
    </div>
  );
}

export default MainLayout;
