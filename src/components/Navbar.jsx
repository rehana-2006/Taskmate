import React from "react";

function Navbar() {
  return (
    <div className="topbar-wrapper">
      <div className="topbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search project, team member, or tasks..."
        />
      </div>
    </div>
  );
}
export default Navbar;
