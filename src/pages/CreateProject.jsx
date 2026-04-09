import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function CreateProject() {
  const navigate = useNavigate();
  const { user } = useAuth();


  const ValidationSchema = Yup.object({
    title: Yup.string().required("Project title is required"),
    key: Yup.string()
      .required("Project key is required")
      .max(5, "Key too long"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date can't be before start date")
      .required("End date is required"),
    priority: Yup.string().required("Please select priority"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      key: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await api.post("/projects", { ...values, manager: user?.fullName });
        navigate("/projects");
      } catch (error) {

        setStatus(error.response?.data?.message || "Failed to create project");
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="create-form-container">
      <form className="create-form-card" onSubmit={formik.handleSubmit}>
        <h2 className="create-form-title">Create New Project</h2>
        {formik.status && (
          <div style={{ color: "#ef4444", marginBottom: "1rem", textAlign: "center" }}>
            {formik.status}
          </div>
        )}


        <div className="create-form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.title}
            </div>
          )}
        </div>

        <div className="create-form-group">
          <label htmlFor="key">Project Key</label>
          <input
            type="text"
            id="key"
            name="key"
            onChange={formik.handleChange}
            value={formik.values.key}
            onBlur={formik.handleBlur}
          />
          {formik.touched.key && formik.errors.key && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.key}
            </div>
          )}
        </div>

        <div className="create-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
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

        <div className="create-form-row">
          <div className="create-form-group">
            <label htmlFor="startDate">Start Date</label>
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

          <div className="create-form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={formik.handleChange}
              value={formik.values.endDate}
              onBlur={formik.handleBlur}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div
                className="error-text"
                style={{ color: "#ef4444", fontSize: "0.75rem" }}
              >
                {formik.errors.endDate}
              </div>
            )}
        </div>
        </div>


        <div className="create-form-group">
          <label htmlFor="manager">Project Manager</label>
          <input
            type="text"
            id="manager"
            value={user?.fullName || ""}
            readOnly
            style={{ background: "#f3f4f6", cursor: "not-allowed", color: "#6b7280" }}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            name="priority"
            onChange={formik.handleChange}
            value={formik.values.priority}
            onBlur={formik.handleBlur}
          >
            <option value="">-- Select --</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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

        <button type="submit" className="create-primary-btn">
          Create Project
        </button>
      </form>
    </div>
  );
}
export default CreateProject;
