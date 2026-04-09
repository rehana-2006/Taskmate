import React, { useEffect, useState } from "react"; // UI library
import ProjectCard from "../components/ProjectCard"; // Individual project component
import { useNavigate } from "react-router-dom"; // Navigation hook
import { useAuth } from "../context/AuthContext"; // Authentication state
import api from "../services/api"; // API helper

function Project() {
  const navigate = useNavigate(); // Helper to switch pages
  const { user } = useAuth(); // Get current logged-in user info
  const [projects, setProjects] = useState([]); // List of projects to show
  const [loading, setLoading] = useState(true); // Loading state
  const isPM = user?.role === "project_manager"; // Check if user is a Manager

  useEffect(() => {
    // Function to fetch data from backend
    const fetchProjects = async () => {
      try {
        // Fetch both projects and tasks at the same time for efficiency
        const [projRes, tasksRes] = await Promise.all([
          api.get("/projects"),
          api.get("/tasks")
        ]);

        if (isPM) {
          // If the user is a Manager, show them ALL projects
          setProjects(projRes.data);
        } else {
          // If user is a Team Member, filter projects
          // 1. Find all tasks assigned to the current user
          const userTasks = tasksRes.data.filter(
            (t) => t.assignee === user?.fullName || t.assignee === user?.email
          );
          // 2. Identify which unique projects those tasks belong to
          const assignedProjectKeys = [...new Set(userTasks.map(t => t.projectKey))];
          
          // 3. Only keep projects that the user has at least one task in
          const filteredProjects = projRes.data.filter(p => 
            assignedProjectKeys.includes(p.key)
          );
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchProjects(); // Run the fetch on component load
  }, []);



  return (
    <div className="project-page-container">
      <header className="page-header">
        <div className="header-info">
          <h1>Projects</h1>
          <p>Manage and track all your active projects in one place.</p>
        </div>
        {isPM && (
          <button
            className="create-btn"
            onClick={() => navigate("/create-project")}
          >
            + Create Project
          </button>
        )}
      </header>

      <div className="projects-grid">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>No projects found. {isPM && "Create one to get started!"}</p>
        )}
      </div>

    </div>
  );
}

export default Project;
