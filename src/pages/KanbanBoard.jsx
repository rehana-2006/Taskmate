import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function KanbanBoard() {

  const [tasks, setTasks] = useState({
    todo: [
      { id: "1", title: "Design UI" },
      { id: "2", title: "Setup Database" }
    ],
    progress: [
      { id: "3", title: "Build API" }
    ],
    done: [
      { id: "4", title: "Project Setup" }
    ]
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
        [sourceColumn]: sourceItems
      });

    } else {

      destItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">

        {Object.keys(tasks).map((column) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >

                <h3>{column.toUpperCase()}</h3>

                {tasks[column].map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
  );
}

export default KanbanBoard;