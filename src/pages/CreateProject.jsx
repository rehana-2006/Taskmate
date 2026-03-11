import React from "react";

function CreateProject() {
  return (
    <div className="create-form-container">
      <form className="create-form-card">
        <h2 className="create-form-title">Create New Project</h2>

        <div className="create-form-group">
          <label>Project Title</label>
          <input type="text" />
        </div>

        <div className="create-form-group">
          <label>Project Key</label>
          <input type="text" />
        </div>

        <div className="create-form-group">
          <label>Description</label>
          <textarea></textarea>
        </div>

        <div className="create-form-row">
          <div className="create-form-group">
            <label>Start Date</label>
            <input type="date" />
          </div>

          <div className="create-form-group">
            <label>End Date</label>
            <input type="date" />
          </div>
        </div>

        <div className="create-form-group">
          <label>Priority</label>
          <select>
            <option value="">-- Select --</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button type="submit" className="create-primary-btn">
          Create Project
        </button>
      </form>
    </div>
  );
}
export default CreateProject;
