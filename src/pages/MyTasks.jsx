import React from "react";
import { Link } from "react-router-dom";

function MyTasks() {
  const myCurrentTasks = [
    { id: 1, title: 'Database Migration',    project: 'PMS System',        status: 'In Progress', priority: 'High'   },
    { id: 2, title: 'Logo Design Concepts',  project: 'PM Studio Branding', status: 'Pending',     priority: 'Medium' },
    { id: 3, title: 'API Documentation',     project: 'TaskMate AI',        status: 'In Progress', priority: 'Low'    },
  ];

  return (
    <div className="recent-container">

      <div className="mytasks-header">
        <h2 className="recent-title">My Tasks</h2>
        <div className="mytasks-view-toggle">
          <Link to="/mytasks" className="active">List View</Link>
          <Link to="/board">Board View</Link>
        </div>
      </div>

      <div className="recent-table-wrapper">
        <table className="recent-table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {myCurrentTasks.map((myTask) => (
              <tr key={myTask.id}>
                <td>{myTask.title}</td>
                <td>{myTask.project}</td>
                <td data-status={myTask.status}>{myTask.status}</td>
                <td data-priority={myTask.priority}>{myTask.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
export default MyTasks;