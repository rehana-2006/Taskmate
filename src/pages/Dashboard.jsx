import React from "react";
import ProjectCountCard from "../components/ProjectCountCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const isPM = user?.role === "project_manager";

  const taskDataTeam = [
    { id: 1, number: 5, name: "Active Tasks" },
    { id: 2, number: 8, name: "Assigned to me" },
    { id: 3, number: 12, name: "Completed" },
    { id: 4, number: 2, name: "Pending" },
  ];

  const taskDataPM = [
    { id: 1, number: 3, name: "Active Projects" },
    { id: 2, number: 24, name: "Total Tasks" },
    { id: 3, number: 8, name: "Team Members" },
    { id: 4, number: 5, name: "Delayed" },
  ];

  const myCurrentTasks = [
    { id: 1, title: 'Database Migration', project: 'PMS System', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Logo Design Concepts', project: 'PM Studio Branding', status: 'Pending', priority: 'Medium' },
    { id: 3, title: 'API Documentation', project: 'TaskMate AI', status: 'In Progress', priority: 'Low' },
  ];

  const allProjects = [
    { id: 1, name: 'TaskMate AI', manager: 'You', status: 'In Progress', completion: 45 },
    { id: 2, name: 'PMS System', manager: 'You', status: 'In Progress', completion: 70 },
    { id: 3, name: 'Branding Project', manager: 'You', status: 'Completed', completion: 100 },
  ];

  const displayStats = isPM ? taskDataPM : taskDataTeam;

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h2>{isPM ? "Project Manager Dashboard" : "Team Member Dashboard"}</h2>
        {isPM && (
          <div className="dashboard-actions">
            <Link to="/create-project" className="btn-primary">Add Project</Link>
            <Link to="/create-task" className="btn-secondary">Assign Task</Link>
          </div>
        )}
      </div>

      <div className="task-grid">
        {displayStats.map((task, idx) => (
          <ProjectCountCard key={idx} Data={task} />
        ))}
      </div>

      <div className="recent-container">
        <h2 className="recent-title">{isPM ? "Active Projects Overview" : "Recent Tasks Assigned to You"}</h2>
        <div className="recent-table-wrapper">
          <table className="recent-table">
            <thead>
              {isPM ? (
                <tr>
                  <th>Project Name</th>
                  <th>Manager</th>
                  <th>Status</th>
                  <th>Completion</th>
                </tr>
              ) : (
                <tr>
                  <th>Task Title</th>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              )}
            </thead>
            <tbody>
              {isPM ? (
                allProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.manager}</td>
                    <td><span className={`status-${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span></td>
                    <td>{project.completion}%</td>
                  </tr>
                ))
              ) : (
                myCurrentTasks.map((myTask) => (
                  <tr key={myTask.id}>
                    <td>{myTask.title}</td>
                    <td>{myTask.project}</td>
                    <td>{myTask.status}</td>
                    <td>{myTask.priority}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
