// Login component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    sessionStorage.clear();
        },[]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8080/user/login', {
          email: values.email,
          password: values.password,
        });
        console.log(response.data); // Handle success, e.g., store token in local storage
        navigate('/Student');
      } catch (error) {
        console.error('Login failed:', error);
        swal("Error", "Signup failed. Please try again.", "error");
      }
    },
  });

  return (
    <div>
      <br />
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
