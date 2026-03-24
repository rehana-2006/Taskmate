import React from "react";
import { Link } from "react-router-dom";

function SideNavPm() {
  return (
    <div>
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
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}
export default SideNavPm;