import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const { user, theme, toggleTheme, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    updateProfile({ name: formData.name });
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="settings-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Account Settings</h2>
      <div className="settings-section" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '30px', marginTop: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Profile Information</h3>
        <form onSubmit={handleUpdate}>
          <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Username</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }} />
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Email (View Only)</label>
              <input type="email" value={user?.email || ""} readOnly style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-muted)', cursor: 'not-allowed' }} />
            </div>
          </div>

          <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>New Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }} />
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Confirm New Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>Save Changes</button>
          {message && <p style={{ marginTop: '10px', color: message.includes('successfully') ? '#10b981' : '#ef4444', fontSize: '0.85rem' }}>{message}</p>}
        </form>

        <h3 style={{ marginBottom: '20px', paddingTop: '30px', borderTop: '1px solid var(--border-color)', marginTop: '30px' }}>Application Settings</h3>
        <div className="settings-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
          <div>
            <p style={{ fontWeight: 600 }}>Theme Mode</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Currently using: <strong style={{ textTransform: 'capitalize' }}>{theme}</strong> mode.</p>
          </div>
          <button onClick={toggleTheme} className="btn-secondary" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
