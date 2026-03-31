import React from "react";
import { Link } from "react-router-dom";

function KanbanBoard() {
  return (

    <div>
      <div className="kanban-view-toggle">
        <Link to="/mytasks">List View</Link>
        <Link to="/kanban" className="active">
          Kanban View
        </Link>
      </div>
      <br/>
      <p>this is the kanban board</p>
    </div>
  );
}
export default KanbanBoard;
