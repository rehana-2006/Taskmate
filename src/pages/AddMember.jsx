import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMember() {
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    role: Yup.string().required("Please enter the role"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter the email address"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      role: "",
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await api.post("/team-members", values);
        navigate("/team");
      } catch (error) {

        console.error("Add Member Error:", error.response?.data || error.message);
        setStatus(error.response?.data?.message || "Failed to add member");
        setSubmitting(false);
      }

    },
  });

  return (
    <div className="create-task-container">
      <form className="create-task-card" onSubmit={formik.handleSubmit}>
        <h2 className="create-task-title">Add a new member</h2>
        {formik.status && (
          <div style={{ color: "#ef4444", marginBottom: "1rem", textAlign: "center" }}>
            {formik.status}
          </div>
        )}
        <div className="create-task-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="eg: Jane Smith"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.fullName}
            </div>
          )}
        </div>
        <div className="create-task-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="eg: UI Designer"
            onChange={formik.handleChange}
            value={formik.values.role}
            onBlur={formik.handleBlur}
          />
          {formik.touched.role && formik.errors.role && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.role}
            </div>
          )}
        </div>
        <div className="create-task-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="eg: jane@example.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        <button type="submit" className="create-primary-btn">
          Add member
        </button>
      </form>
    </div>
  );
}

export default AddMember;
