import React from "react";

function CreateTask() {
  return (
    <div className="create-task-container">
      <form className="create-task-card">
        <h2 className="create-task-title">Create New Task</h2>

        <div className="create-task-group">
          <label>Task name:</label>
          <input type="text" placeholder="eg:improve the UI for the calender"/>
        </div>
        <div className="create-task-row">
        <div className="create-task-group">
          <label>Project Name:</label>
          <input type="text" placeholder="Eg: web development"/>
        </div>
        <div className="create-task-group">
          <label>Project key:</label>
          <input type="text" placeholder="Eg:WD"/>
        </div>
        </div>
        <div className="create-task-group">
          <label>Description</label>
          <textarea placeholder="write the detailed description..."></textarea>
        </div>
        <div className="create-task-row">
        <div className="create-task-group">
          <label>start date:</label>
          <input type="date" />
        </div>
        <div className="create-task-group">
          <label>due date:</label>
          <input type="date" />
        </div>
        </div>
        <div className="create-task-group">
          <label>Assignee:</label>
          <input type="text" placeholder="Eg:John" />
        </div>
        <div className="create-task-group">
          <label>Priority</label>
          <select>
            <option value="default"> --select--</option>
            <option value="high">High</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <div className="create-task-group">
          <label>Status</label>
          <select>
            <option value="To-do">To-Do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" className="create-primary-btn"> Create Task </button>
      </form>
    </div>
  );
}

export default CreateTask;
