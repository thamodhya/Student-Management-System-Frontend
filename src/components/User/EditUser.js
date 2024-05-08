import React, { useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import swal from 'sweetalert';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  country: Yup.string().required('Country is required'),
  useraddress: Yup.string().required('Address is required'),
  gender: Yup.string().required('Gender is required'),
});

const Edit = ({ user }) => {
  const [updatedUnit, setUpdatedUnit] = useState(user);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setUpdatedUnit({
      ...updatedUnit,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(updatedUnit, { abortEarly: false });
      const response = await axios.put(`http://localhost:8080/user/update/${user.userId}`, updatedUnit);
      if (response.status === 200) {
        swal({
          icon: 'success',
          text: 'Successfully updated',
        }).then(() => {
          window.location.reload(); // Refresh the page
        });
      } else {
        console.error('Update failed:', response.statusText);
        swal({
          icon: 'error',
          text: 'Update failed. Please try again.',
        });
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error:', error);
        swal({
          icon: 'error',
          text: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
  };

  return (
    <>
      <p>
        <FaPencilAlt
          className="editIcon rounded float-end"
          style={{ color: 'blue' }}
          data-bs-toggle="modal"
          data-bs-target={`#edit-modal-${user.userId}`}
        />
      </p>
      <div className="modal fade" id={`edit-modal-${user.userId}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit-modal-label">
                Edit
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onUpdate}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Name
                  </label>
                  <input type="text" className={`form-control ${errors.username && 'is-invalid'}`} id="username" name="username" value={updatedUnit.username} onChange={onChange} />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" value={updatedUnit.email} onChange={onChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input type="text" className={`form-control ${errors.country && 'is-invalid'}`} id="country" name="country" value={updatedUnit.country} onChange={onChange} />
                  {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="useraddress" className="form-label">
                    Address
                  </label>
                  <input type="text" className={`form-control ${errors.useraddress && 'is-invalid'}`} id="useraddress" name="useraddress" value={updatedUnit.useraddress} onChange={onChange} />
                  {errors.useraddress && <div className="invalid-feedback">{errors.useraddress}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="male" name="gender" value="male" checked={updatedUnit.gender === 'male'} onChange={onChange} />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="female" name="gender" value="female" checked={updatedUnit.gender === 'female'} onChange={onChange} />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                  {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <input type="submit" value="Update" className="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
