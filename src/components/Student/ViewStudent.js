import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import Edit from './EditStudent';
import Delete from './DeleteStudent';
import Appbar from '../AppBar';

// Define Yup schema for form validation
const validationSchema = object({
    name: string().required('Name is required'),
    studentClass: string().required('Class is required'),
});

export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
    const [students, setStudents] = useState([]);

    // Formik hook to handle form state and submission
    const formik = useFormik({
        initialValues: {
            name: '',
            studentClass: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch("http://localhost:8080/student/addStudent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
                if (response.ok) {
                    swal({
                        icon: 'success',
                        text: 'Successfully added',
                    }).then(() => {
                        window.location.reload(); // Refresh the page
                    });
                } else {
                    const data = await response.json();
                    console.error('Add student failed:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                swal({
                    icon: 'warning',
                    text: 'Error',
                });
            }
        },
    });

    useEffect(() => {
        fetch("http://localhost:8080/student/students")
        .then(res => res.json())
        .then((result) => {
            setStudents(result);
        });
    }, []);

    return (
        <div>
            <Appbar />
            <div className="container">
                <div className="card" style={paperStyle}>
                    <h1 style={{ color: "blue" }}>Add Student</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">Student Name</label>
                            <input
                                type="text"
                                className={`form-control ${formik.errors.name ? 'is-invalid' : ''}`}
                                id="studentName"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="studentClass" className="form-label">Student Class</label>
                            <input
                                type="text"
                                className={`form-control ${formik.errors.studentClass ? 'is-invalid' : ''}`}
                                id="studentClass"
                                {...formik.getFieldProps('studentClass')}
                            />
                            {formik.errors.studentClass && <div className="invalid-feedback">{formik.errors.studentClass}</div>}
                        </div>
                        <button type="submit" className="btn btn-secondary">Add Student</button>
                    </form>
                </div>
                <h1>Students</h1>
                {students.map(student => (
                    <div className="card" style={paperStyle} key={student.id}>
                        <div className="card-body">
                            <p>Id: {student.id}</p>
                            <p>Name: {student.name}</p>
                            
                            <div class='col-lg-12'>
                                <div>
                                    <Edit key={student.id} student={student} />
                                </div>
                                <p>Class: {student.studentClass}</p>
                                <div>
                                    <Delete key={student.id} student={student} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}