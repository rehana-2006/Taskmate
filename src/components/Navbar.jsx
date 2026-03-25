import React from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="topbar-wrapper">
      <div className="topbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search project, team member, or tasks..."
        />
        <div
          className="user-profile"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div className="user-info" style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>
              {user.name }
            </p>
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {user.role.replace("_", " ")}
            </p>
          </div>
          <button
            onClick={logout}
            className="logout-btn"
            style={{
              background: "transparent",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
              padding: "6px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
