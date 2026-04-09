import React, { useEffect, useState } from "react";
import ProjectCountCard from "../components/ProjectCountCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isPM = user?.role === "project_manager";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, tasksRes, usersRes] = await Promise.all([
          api.get("/projects"),
          api.get("/tasks"),
          api.get("/team-members"),
        ]);

        setProjects(projectsRes.data);
        setTasks(tasksRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const myCurrentTasks = isPM 
    ? tasks 
    : tasks.filter(t => t.assignee === user?.fullName || t.assignee === user?.email);


  const taskDataTeam = [
    { id: 1, number: tasks.filter(t => t.status === "In progress").length, name: "Active Tasks" },
    { id: 2, number: myCurrentTasks.length, name: "Assigned to me" },
    { id: 3, number: tasks.filter(t => t.status === "Completed").length, name: "Completed" },
    { id: 4, number: tasks.filter(t => t.status === "Pending").length, name: "Pending" },
  ];

  const taskDataPM = [
    { id: 1, number: projects.length, name: "Total Projects" },
    { id: 2, number: tasks.length, name: "Total Tasks" },
    { id: 3, number: users.length, name: "Team Members" },
    { id: 4, number: tasks.filter(t => (t.status === "Delayed" || t.status === "Pending")).length, name: "Needs Attention" },
  ];

  const allProjects = projects.map(p => ({
    id: p.id,
    name: p.title,
    status: p.status || "Active",
    completion: 0, // In a real app, calculate this based on tasks for this project
  }));


  const displayStats = isPM ? taskDataPM : taskDataTeam;

  // Generate dynamic activities from tasks and projects
  const activities = [
    ...tasks.slice(0, 3).map(t => ({
      id: `t-${t.id}`,
      text: `Task '${t.taskName}' was created`,
      time: new Date(t.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : "Recently"
    })),
    ...projects.slice(0, 1).map(p => ({
      id: `p-${p.id}`,
      text: `New project '${p.title}' initiated`,
      time: "Recently"
    }))
  ];


  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h2>{isPM ? "Project Manager Dashboard" : "Team Member Dashboard"}</h2>
        {isPM && (
          <div className="dashboard-actions">
            <Link to="/create-project" className="btn-primary">
              Add Project
            </Link>
            <Link to="/create-task" className="btn-secondary">
              Assign Task
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <div className="dashboard-layout">
          <div className="dashboard-main-content">
            <div className="task-grid">
              {displayStats.map((task, idx) => (
                <ProjectCountCard key={idx} Data={task} />
              ))}
            </div>

            <div className="recent-container" style={{ marginTop: "32px" }}>
              <h2 className="recent-title">
                {isPM
                  ? "Active Projects Overview"
                  : "Recent Tasks Assigned to You"}
              </h2>
              <div className="recent-table-wrapper">
                <table className="recent-table">
                  <thead>
                    {isPM ? (
                      <tr>
                        <th>Project Name</th>
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
                    {isPM
                      ? allProjects.map((project) => (
                          <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>
                              <span
                                className={`status-${project.status.toLowerCase().replace(" ", "-")}`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td>{project.completion}%</td>
                          </tr>
                        ))
                      : myCurrentTasks.map((myTask) => (
                          <tr key={myTask.id}>
                            <td>{myTask.title}</td>
                            <td>{myTask.project}</td>
                            <td>{myTask.status}</td>
                            <td>{myTask.priority}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {isPM && (
            <aside className="activity-sidebar">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <span className="activity-status-dot"></span>
                    <div className="activity-info">
                      <p className="activity-text">{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}


export default Dashboard;
