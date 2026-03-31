import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleViewProject = () => {
    navigate("/viewproject", { state: project });
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <h4 className="project-title">{project.title}</h4>
        <span className="project-status">{project.status}</span>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-info">
        <span>Manager: {project.manager}</span>
        <span>Key: {project.key}</span>
      </div>

      <button className="project-btn" onClick={handleViewProject}>
        View Project
      </button>
    </div>
  );
}

export default ProjectCard;
