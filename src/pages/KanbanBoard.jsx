import React, { useState, useEffect } from "react"; // UI library components
import { Link } from "react-router-dom"; // Navigation link
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Drag-and-drop toolkit
import api from "../services/api"; // Axios helper for API calls

// Helper to convert internal ID to displayable status text
const statusMapping = {
  todo: "To-do",
  progress: "In progress",
  done: "Completed"
};

// Helper to convert database status text to internal column ID
const revMapping = {
  "To-do": "todo",
  "In progress": "progress",
  "Completed": "done",
  "Pending": "todo" // Default to todo if pending
};

function KanbanBoard() {
  // State to hold tasks split into 3 columns
  const [tasks, setTasks] = useState({
    todo: [],
    progress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true); // Control loading spinner
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Task deletion modal control
  const [selectedTask, setSelectedTask] = useState(null); // The specific task being deleted



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        const grouped = {
          todo: [],
          progress: [],
          done: [],
        };
        response.data.forEach(task => {
          const col = revMapping[task.status] || "todo";
          grouped[col].push(task);
        });
        setTasks(grouped);
      } catch (error) {
        console.error("Error fetching tasks for board:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn && source.index === destination.index) return;

    const sourceItems = [...tasks[sourceColumn]];
    const destItems = sourceColumn === destColumn ? sourceItems : [...tasks[destColumn]];

    const [movedItem] = sourceItems.splice(source.index, 1);
    
    // Update local state immediately for responsiveness (optimistic update)
    const newStatus = statusMapping[destColumn];
    const updatedItem = { ...movedItem, status: newStatus };
    
    if (sourceColumn === destColumn) {
      sourceItems.splice(destination.index, 0, updatedItem);
      setTasks({ ...tasks, [sourceColumn]: sourceItems });
    } else {
      destItems.splice(destination.index, 0, updatedItem);
      setTasks({
        ...tasks,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems,
      });
    }

    try {
      await api.patch(`/tasks/${movedItem.id}/status`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteClick = (task, column) => {
    setSelectedTask({ ...task, column });
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      await api.delete(`/tasks/${selectedTask.id}`);
      setTasks(prev => ({
        ...prev,
        [selectedTask.column]: prev[selectedTask.column].filter(t => t.id !== selectedTask.id)
      }));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };




  return (
    <div>
      <div className="kanban-view-toggle">
        <Link to="/mytasks">List View</Link>
        <Link to="/kanban" className="active">
          Kanban View
        </Link>
      </div>
      <br></br>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board" style={{display:"flex", gap:"20px"}}>
          {Object.keys(tasks).map((column) => (
            <Droppable droppableId={column} key={column}>
              {(provided, snapshot) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  data-is-dragging-over={snapshot.isDraggingOver}
                >
                  <h3 style={{textAlign:"center"}}>
                    {column === "progress"
                      ? "IN PROGRESS"
                      : column.toUpperCase()}
                  </h3>

                  {loading ? (
                    <p style={{ textAlign: "center", padding: "10px" }}>...</p>
                  ) : (
                    tasks[column].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                            <div
                              className="task-card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              data-is-dragging={snapshot.isDragging}
                              style={{ position: "relative", ...provided.draggableProps.style }}
                            >
                            <button
                                onClick={() => handleDeleteClick(task, column)}
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  background: "none",
                                  border: "none",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
                                  padding: "0 4px"
                                }}
                                title="Delete Task"
                              >
                                &times;
                              </button>
                              <h4>{task.taskName}</h4>
                              <p><strong>Project:</strong> {task.projectName}</p>
                              <p><strong>Priority:</strong> {task.priority}</p>
                              <p><strong>Assignee:</strong> {task.assignee}</p>
                              <p style={{fontSize:"0.8rem", color:"grey"}}>
                                {new Date(task.startDate).toLocaleDateString()} - {new Date(task.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                        )}
                      </Draggable>
                    ))
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-dialog">
            <div className="dialog-icon">🗑️</div>
            <h3>Delete Task?</h3>
            <p>
              Are you sure you want to delete <strong>{selectedTask?.taskName}</strong>? 
              This will remove it from the board permanently.
            </p>
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDeleteTask}>
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


export default KanbanBoard;