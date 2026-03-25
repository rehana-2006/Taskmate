import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useFormik } from "formik";
import * as Yup from "yup";

function Settings() {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [message, setMessage] = useState("");

  const ValidationSchema = Yup.object({
    name: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateProfile({ name: values.name });
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  return (
    <div className="settings-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Account Settings</h2>
      <div className="settings-section" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '30px', marginTop: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Profile Information</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="name" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Username</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
              />
              {formik.touched.name && formik.errors.name && <div className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem' }}>{formik.errors.name}</div>}
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Email (View Only)</label>
              <input type="email" value={user?.email || ""} readOnly style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-muted)', cursor: 'not-allowed' }} />
            </div>
          </div>

          <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="password" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Leave blank to keep current"
                style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
              />
              {formik.touched.password && formik.errors.password && <div className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem' }}>{formik.errors.password}</div>}
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="confirmPassword" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem' }}>{formik.errors.confirmPassword}</div>}
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
