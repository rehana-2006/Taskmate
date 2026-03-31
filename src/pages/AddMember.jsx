import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function AddMember() {
  const Navigate = useNavigate();

  const ValidationSchema = Yup.object({
    memberName: Yup.string().required("member name is required"),
    Role: Yup.string().required("please enter the role"),
    Email: Yup.string()
      .email("Invalid email address")
      .required("please enter the email address"),
  });

  const formik = useFormik({
    initialValues: {
      memberName: "",
      Role: "",
      Email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log("member added:", values);
      Navigate("/team");
    },
  });
  return (
    <div className="create-task-container">
      <form className="create-task-card" onSubmit={formik.handleSubmit}>
        <h2 className="create-task-title">Add a new member</h2>
        <div className="create-task-group">
          <label htmlFor="memberName">Enter the name:</label>
          <input
            type="text"
            id="memberName"
            name="memberName"
            placeholder="enter the name"
            onChange={formik.handleChange}
            value={formik.values.memberName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.memberName && formik.errors.memberName && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.memberName}
            </div>
          )}
        </div>
        <div className="create-task-group">
          <label htmlFor="Role">enter the role</label>
          <input
            type="text"
            id="Role"
            name="Role"
            placeholder="enter thr role"
            onChange={formik.handleChange}
            value={formik.values.Role}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Role && formik.errors.Role && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.Role}
            </div>
          )}
        </div>
        <div className="create-task-group">
          <label htmlFor="Email">enter the email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="enter the email"
            onChange={formik.handleChange}
            value={formik.values.Email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Email && formik.errors.Email && (
            <div
              className="error-text"
              style={{ color: "#ef4444", fontSize: "0.75rem" }}
            >
              {formik.errors.Email}
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
