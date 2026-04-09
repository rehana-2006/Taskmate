import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        // PMs see everything, members see assigned tasks
        const filteredTasks = user?.role === "project_manager" 
          ? response.data 
          : response.data.filter(
            (t) => t.assignee === user?.fullName || t.assignee === user?.email
          );
        setTasks(filteredTasks);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedTask) return;
    try {
      await api.delete(`/tasks/${selectedTask.id}`);
      setTasks(tasks.filter(t => t.id !== selectedTask.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };




  return (
    <div className="recent-container">
      <div className="mytasks-header">
        <h2 className="recent-title">My Tasks</h2>
        <div className="mytasks-view-toggle">
          <Link to="/mytasks" className="active">
            List View
          </Link>
          <Link to="/board">Board View</Link>
        </div>
      </div>

      <div className="recent-table-wrapper">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading your tasks...</p>
        ) : tasks.length > 0 ? (
          <table className="recent-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Start date</th>
                <th>due date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((myTask) => (
                <tr key={myTask.id}>
                  <td>{myTask.taskName}</td>
                  <td>{myTask.projectName}</td>
                  <td data-status={myTask.status}>{myTask.status}</td>
                  <td data-priority={myTask.priority}>{myTask.priority}</td>
                  <td data-assignee={myTask.assignee}>{myTask.assignee}</td>
                  <td>
                    {new Date(myTask.startDate).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(myTask.dueDate).toLocaleDateString()}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDeleteClick(myTask)}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.2rem"}}
                      title="Delete Task"
                    >
                      &times;
                    </button>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ padding: "20px" }}>No tasks assigned to you yet.</p>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-dialog">
            <div className="dialog-icon">🗑️</div>
            <h3>Delete Task?</h3>
            <p>
              Are you sure you want to delete <strong>{selectedTask?.taskName}</strong>? 
              This will remove it from your task list permanently.
            </p>
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .delete-dialog {
          background: var(--bg-primary);
          padding: 2rem;
          border-radius: 24px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          border: 1px solid var(--border-color);
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dialog-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .delete-dialog h3 {
          margin-bottom: 0.8rem;
          font-size: 1.4rem;
        }

        .delete-dialog p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .dialog-actions {
          display: flex;
          gap: 12px;
        }

        .dialog-actions button {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .confirm-delete-btn {
          background: #ef4444;
          color: white;
          border: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default MyTasks;
