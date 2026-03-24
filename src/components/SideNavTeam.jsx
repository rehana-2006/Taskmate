import React from "react";
import { Link } from "react-router-dom";

function SideNavTeam() {
  return (
    <aside className="sidebar">
      <h2 className="logo">TaskMate</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/mytasks">My Tasks</Link></li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}
export default SideNavTeam;