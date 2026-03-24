import React from "react";

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup</h2>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" />
          </div>

          <div className="form-group">
            <label>Choose your role</label>
            <select>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
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
