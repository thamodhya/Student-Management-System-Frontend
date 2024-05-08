import React, { useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import swal from 'sweetalert';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  class: Yup.string().required('Class is required'),
});

const Edit = ({ student }) => {
  const [updatedUnit, setUpdatedUnit] = useState(student);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setUpdatedUnit({
      ...updatedUnit,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    console.log(student.id);
    try {
      await validationSchema.validate(updatedUnit, { abortEarly: false });
      const response = await axios.put(`http://localhost:8080/student/update/${student.id}`, updatedUnit);
      console.log(response);
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
          data-bs-target={`#edit-modal-${student.id}`}
        />
      </p>
      <div className="modal fade" id={`edit-modal-${student.id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
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
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="name" name="name" value={updatedUnit.name} onChange={onChange} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="studentClass" className="form-label">
                    Class
                  </label>
                  <input type="text" className={`form-control ${errors.studentClass && 'is-invalid'}`} id="studentClass" name="studentClass" value={updatedUnit.studentClass} onChange={onChange} />
                  {errors.studentClass && <div className="invalid-feedback">{errors.studentClass}</div>}
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
