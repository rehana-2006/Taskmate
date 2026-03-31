import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    role: Yup.string().required("Please select a role"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "team_member",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      // In a real app, you'd send this to the backend
      const userData = {
        email: values.email,
        role: values.role,
        name: values.fullName,
      };
      login(userData);
      navigate("/dashboard");
    },
  });

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName ? (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.fullName}
            </div>
          ) : (
            ""
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.confirmPassword}
            </div>
          ) : (
            ""
          )}

          <div className="form-group">
            <label htmlFor="role">Choose your role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
              onBlur={formik.handleBlur}
            >
              <option value="project_manager">Project Manager</option>
              <option value="team_member">Team Member</option>
            </select>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <p className="signup-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
