import React from "react";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email..." />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password..." />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;