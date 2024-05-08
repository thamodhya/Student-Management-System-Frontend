import React, { useEffect, useState } from 'react';
import Edit from './User/EditUser';
import Appbar from "./AppBar";
import * as Yup from 'yup';
import swal from 'sweetalert';

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required('Current Password is required'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(6, 'Password must be at least 6 characters'),
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        // ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export default function Student() {
    const userId = '6';
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
    const [user, setUser] = useState(null); // Initialize as null
    const [isCardVisible, setIsCardVisible] = useState(false); // State to control card visibility
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/user/MyProfile/${userId}`)
        .then(res => res.json())
        .then((result) => {
            setUser(result); // Update the user state with the fetched user object
            console.log(result);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    const toggleCardVisibility = () => {
        setIsCardVisible(!isCardVisible); // Toggle card visibility
    };

    const handleInputChange = (e) => {
        setPasswordFields({
            ...passwordFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleResetPassword = () => {
        validationSchema.validate(passwordFields, { abortEarly: false })
            .then(() => {
                // Send a request to your backend to update the password
                fetch(`http://localhost:8080/user/resetPassword/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password: passwordFields.newPassword })
                })
                .then(response => {
                    if (response.ok) {
                        // Password reset successful
                        // Display a success message to the user
                        swal({
                            icon: 'success',
                            text: 'Password reset successful',
                        }).then(() => {
                            setPasswordFields({
                                // currentPassword: '',
                                newPassword: '',
                                confirmPassword: '',
                            });
                            toggleCardVisibility(); // Hide the card after successful reset
                        });
                    } else {
                        // Password reset failed
                        // Display an error message to the user
                        swal({
                            icon: 'error',
                            text: 'Password reset failed. Please try again.',
                        });
                    }
                })
                .catch(error => {
                    console.error('Error resetting password:', error);
                    // Display an error message to the user
                    swal({
                        icon: 'error',
                        text: 'An error occurred while resetting password. Please try again later.',
                    });
                });
            })
            .catch((err) => {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            });
    };

    return (
        <div>
            <Appbar />
            <div className="container">
                <h1>My Profile</h1>
                {user !== null && (
                    <div className="card" style={paperStyle}>
                        <div className="card-body">
                            <p>Id: {user.userId}</p>
                            <p>Name: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Address: {user.useraddress}</p>
                            <p>Country: {user.country}</p>
                            <p>Gender: {user.gender}</p>
                            <br />
                            <div className='col-lg-12'>
                                <div>
                                    <Edit key={user.userId} user={user} />
                                </div>
                            </div>
                            <p>Reset Password</p>
                            <button className="btn btn-primary" onClick={toggleCardVisibility}>
                                Reset Password
                            </button>
                            {isCardVisible && (
                                <div className="card mt-3">
                                    <div className="card-body">
                                        {/* <div className="mb-3">
                                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.currentPassword && 'is-invalid'}`}
                                                id="currentPassword"
                                                name="currentPassword"
                                                value={user.password}
                                                onChange={handleInputChange}
                                            />
                                            {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
                                        </div> */}
                                        <div className="mb-3">
                                            <label htmlFor="newPassword" className="form-label">New Password</label>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.newPassword && 'is-invalid'}`}
                                                id="newPassword"
                                                name="newPassword"
                                                value={passwordFields.newPassword}
                                                onChange={handleInputChange}
                                            />
                                            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={passwordFields.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                        </div>
                                        <button className="btn btn-primary" onClick={handleResetPassword}>Save New Password</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {user === null && <p>Loading...</p>}
            </div>
        </div>
    );
}
