import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    taskName: Yup.string().required("Task name is required"),
    projectName: Yup.string().required("Project name is required"),
    projectKey: Yup.string().required("Project key is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    dueDate: Yup.date()
      .min(Yup.ref("startDate"), "Due date can't be before start date")
      .required("Due date is required"),
    assignee: Yup.string().required("Assignee is required"),
    priority: Yup.string().required("Priority is required"),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      taskName: "",
      projectName: "",
      projectKey: "",
      description: "",
      startDate: "",
      dueDate: "",
      assignee: "",
      priority: "medium",
      status: "To-do",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log("Task Created:", values);
      navigate("/board");
    },
  });

  return (
    <div className="create-task-container">
      <form className="create-task-card" onSubmit={formik.handleSubmit}>
        <h2 className="create-task-title">Create New Task</h2>

        <div className="create-task-group">
          <label htmlFor="taskName">Task name:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            placeholder="eg:improve the UI for the calender"
            onChange={formik.handleChange}
            value={formik.values.taskName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.taskName && formik.errors.taskName && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.taskName}
            </div>
          )}
        </div>

        <div className="create-task-row">
          <div className="create-task-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              placeholder="Eg: web development"
              onChange={formik.handleChange}
              value={formik.values.projectName}
              onBlur={formik.handleBlur}
            />
            {formik.touched.projectName && formik.errors.projectName && (
              <div
                className="error-text"
                style={{ color: "#ef4444", fontSize: "0.75rem" }}
              >
                {formik.errors.projectName}
              </div>
            )}
          </div>
          <div className="create-task-group">
            <label htmlFor="projectKey">Project key:</label>
            <input
              type="text"
              id="projectKey"
              name="projectKey"
              placeholder="Eg:WD"
              onChange={formik.handleChange}
              value={formik.values.projectKey}
              onBlur={formik.handleBlur}
            />
            {formik.touched.projectKey && formik.errors.projectKey && (
              <div
                className="error-text"
                style={{ color: "#ef4444", fontSize: "0.75rem" }}
              >
                {formik.errors.projectKey}
              </div>
            )}
          </div>
        </div>

        <div className="create-task-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="write the detailed description..."
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.description}
            </div>
          )}
        </div>

        <div className="create-task-row">
          <div className="create-task-group">
            <label htmlFor="startDate">start date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={formik.handleChange}
              value={formik.values.startDate}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div
                className="error-text"
                style={{ color: "#ef4444", fontSize: "0.75rem" }}
              >
                {formik.errors.startDate}
              </div>
            )}
          </div>
          <div className="create-task-group">
            <label htmlFor="dueDate">due date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              onChange={formik.handleChange}
              value={formik.values.dueDate}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <div
                className="error-text"
                style={{ color: "#ef4444", fontSize: "0.75rem" }}
              >
                {formik.errors.dueDate}
              </div>
            )}
          </div>
        </div>

        <div className="create-task-group">
          <label htmlFor="assignee">Assignee:</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            placeholder="Eg:John"
            onChange={formik.handleChange}
            value={formik.values.assignee}
            onBlur={formik.handleBlur}
          />
          {formik.touched.assignee && formik.errors.assignee && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.assignee}
            </div>
          )}
        </div>

        <div className="create-task-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            onChange={formik.handleChange}
            value={formik.values.priority}
            onBlur={formik.handleBlur}
          >
            <option value="high">High</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          {formik.touched.priority && formik.errors.priority && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.priority}
            </div>
          )}
        </div>

        <div className="create-task-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            onBlur={formik.handleBlur}
          >
            <option value="To-do">To-Do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">completed</option>
            <option value="Pending">Pending</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.status}
            </div>
          )}
        </div>

        <button type="submit" className="create-primary-btn">
          {" "}
          Create Task{" "}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
