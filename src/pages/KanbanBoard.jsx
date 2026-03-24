import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function KanbanBoard() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "1", title: "Design UI" },
      { id: "2", title: "Setup Database" },
    ],
    progress: [{ id: "3", title: "Build API" }],
    done: [{ id: "4", title: "Project Setup" }],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceItems = [...tasks[sourceColumn]];
    const destItems = [...tasks[destColumn]];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceItems,
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems,
      });
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
        <div className="kanban-board">
          {Object.keys(tasks).map((column) => (
            <Droppable droppableId={column} key={column}>
              {(provided, snapshot) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  data-is-dragging-over={snapshot.isDraggingOver}
                >
                  <h3>
                    {column === "progress"
                      ? "IN PROGRESS"
                      : column.toUpperCase()}
                  </h3>

                  {tasks[column].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          data-is-dragging={snapshot.isDragging}
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
