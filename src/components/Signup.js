import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  country: Yup.string().required("Country is required"),
  useraddress: Yup.string().required("Address is required"),
  gender: Yup.string().required("Gender is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    useraddress: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    useraddress: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await fetch("http://localhost:8080/user/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("signup successful!");
        swal("Success", "Signup successful!", "success");
        navigate("/Login");
      } else {
        const data = await response.json();
        console.error("signup failed:", data.error);
        swal("Error", "Signup failed. Please try again.", "error");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Handle Yup validation errors
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setFormErrors(newErrors);
      } else {
        // Handle other errors
        console.error("Error:", error);
        swal("Error", "Signup failed. Please try again.", "error");
      }
    }
  };

  return (
    <div>
        <br></br>
    <div className="container h-100">
  <div className="row h-100 justify-content-center align-items-center">
    <div className="col-lg-6">
       
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <div className="text-danger">{formErrors.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <div className="text-danger">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <div className="text-danger">{formErrors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            {formErrors.country && (
              <div className="text-danger">{formErrors.country}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="useraddress" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="useraddress"
              name="useraddress"
              value={formData.useraddress}
              onChange={handleChange}
            />
            {formErrors.useraddress && (
              <div className="text-danger">{formErrors.useraddress}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            {formErrors.gender && (
              <div className="text-danger">{formErrors.gender}</div>
            )}
          </div>
          <div className="col-lg-12">
  <button type="submit" className="btn btn-primary me-2">
    Sign Up
  </button>
  <Link to="/Login" className="btn btn-secondary">
    Login
  </Link>
</div>

        </form>
        
      </div>
    </div>

    </div>
    </div>
    </div>
    </div>
  );
};

export default Signup;
