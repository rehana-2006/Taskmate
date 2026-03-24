import React from "react";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Project() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPM = user?.role === "project_manager";

  const projects = [
    { id: 1, title: 'TaskMate AI', key: 'TMAI', manager: 'John Doe', status: 'Active', description: 'Advanced task management with AI suggestions.' },
    { id: 2, title: 'E-commerce Redesign', key: 'ECOM', manager: 'Jane Smith', status: 'Pending', description: 'Complete overhaul of the mobile shopping experience.' },
    { id: 3, title: 'PMS System', key: 'PMSS', manager: 'Mike Johnson', status: 'Active', description: 'Internal property management system for residents.' },
    { id: 4, title: 'Marketing Website', key: 'MKTW', manager: 'Sarah Williams', status: 'Active', description: 'Corporate landing page and blog integration.' },
  ];

  return (
    <div className="project-page-container">
      <header className="page-header">
        <div className="header-info">
          <h1>Projects</h1>
          <p>Manage and track all your active projects in one place.</p>
        </div>
        {isPM && (
          <button className="create-btn" onClick={() => navigate("/create-project")}>
            + Create Project
          </button>
        )}
      </header>

      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Project;
