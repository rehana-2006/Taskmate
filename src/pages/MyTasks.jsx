import React from "react";

function MyTasks(){

    const myCurrentTasks = [
        { id: 1, title: 'Database Migration', project: 'PMS System', status: 'In Progress', priority: 'High', progress: 65 },
        { id: 2, title: 'Logo Design Concepts', project: 'PM Studio Branding', status: 'Pending', priority: 'Medium', progress: 0 },
        { id: 3, title: 'API Documentation', project: 'TaskMate AI', status: 'In Progress', priority: 'Low', progress: 40 },
    ];

    return (
        <div className="recent-container">
        <h2 className="recent-title">My Tasks</h2>
        <div className="recent-table-wrapper">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Task title</th>
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
                  <td>{myTask.status}</td>
                  <td>{myTask.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

}
export default MyTasks;