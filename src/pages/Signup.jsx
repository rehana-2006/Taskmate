import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "team_member"
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // In a real app, you'd send this to the backend
    const userData = { email: formData.email, role: formData.role, name: formData.fullName };
    login(userData);
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter your full name" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm password" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Choose your role</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
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
