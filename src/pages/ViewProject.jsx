import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ViewProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { user } = useAuth();
  const isPM = user?.role === "project_manager";

  if (!data) {
    return (
      <div className="error-container">
        <h2>No Project Data Found</h2>
        <button className="back-btn" onClick={() => navigate("/projects")}>
          Return to Projects
        </button>
      </div>
    );
  }

  const handleBack = () => navigate(-1);

  return (
    <div className="view-project-container">
      <nav className="breadcrumb">
        <span onClick={() => navigate("/projects")}>Projects</span> /{" "}
        <span>{data.title}</span>
      </nav>

      <div className="project-view-header">
        <div className="header-left">
          <button className="back-icon-btn" onClick={handleBack} title="Back">
            ←
          </button>
          <div className="title-section">
            <h1>{data.title}</h1>
            <span className={`status-pill ${data.status?.toLowerCase()}`}>
              {data.status}
            </span>
          </div>
        </div>
        <div className="header-actions">
          {isPM && (
            <button
              className="action-btn"
              onClick={() => navigate("/create-task")}
            >
              + Add Task
            </button>
          )}
          <button className="action-btn secondary">Edit Details</button>
          <button
            className="action-btn primary"
            onClick={() => navigate("/board")}
          >
            Open Kanban Board
          </button>
        </div>
      </div>

      <div className="project-view-grid">
        <section className="project-details-card">
          <div className="card-header">
            <h3>Project Details</h3>
          </div>
          <div className="card-content">
            <p className="description">{data.description}</p>
            <div className="meta-grid">
              <div className="meta-item">
                <label>Project Key</label>
                <span>{data.key}</span>
              </div>
              <div className="meta-item">
                <label>Project Manager</label>
                <span>{data.manager || "John Doe"}</span>
              </div>
              <div className="meta-item">
                <label>Start Date</label>
                <span>01 Mar 2026</span>
              </div>
              <div className="meta-item">
                <label>End Date</label>
                <span>30 Mar 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="project-stats-card">
          <div className="card-header">
            <h3>Completion Status</h3>
          </div>
          <div className="card-content">
            <div className="stats-visual">
              <div className="progress-circle-container">
                <div className="progress-value">50%</div>
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray="50, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
            <div className="stats-list">
              <div className="stat-item">
                <span className="dot completed"></span>
                <span className="label">Completed</span>
                <span className="count">07</span>
              </div>
              <div className="stat-item">
                <span className="dot in-progress"></span>
                <span className="label">In Progress</span>
                <span className="count">03</span>
              </div>
              <div className="stat-item">
                <span className="dot todo"></span>
                <span className="label">To Do</span>
                <span className="count">05</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewProject;
