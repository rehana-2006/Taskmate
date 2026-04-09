import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await login(values);
        navigate("/dashboard");
      } catch (error) {
        setStatus(error);
        setSubmitting(false);
      }
    },
  });


  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          {formik.status && (
            <div
              className="error-text"
              style={{
                color: "#ef4444",
                fontSize: "0.875rem",
                textAlign: "center",
                marginBottom: "1rem",
                padding: "0.5rem",
                backgroundColor: "#fef2f2",
                borderRadius: "4px",
                border: "1px solid #fecaca",
              }}
            >
              {formik.status}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="error-text"
              style={{
                color: "#ef4444",
                fontSize: "0.75rem",
                marginBottom: "10px",
              }}
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
              placeholder="Enter your password..."
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="error-text"
              style={{
                color: "#ef4444",
                fontSize: "0.75rem",
                marginBottom: "10px",
              }}
            >
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="login-btn">
            Log In
          </button>
          <p className="login-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
