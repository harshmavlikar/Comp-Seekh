import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';  // Make sure this CSS file is imported

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectPath, setRedirectPath] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');  // Add error state

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Construct URL for GET request with query parameters
            const response = await fetch(`https://localhost:7158/api/Staffs/stafflog?username=${username}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Login failed');

            const staffData = await response.json(); // Make sure to await and parse the response as JSON

            if (Array.isArray(staffData)) {
                const validUser = staffData.find(
                    staffEntry => staffEntry.staffPassword === password
                );

                if (validUser) {
                    // Store staffId in sessionStorage
                    sessionStorage.setItem('staffId', validUser.staffId);

                    setLoggedInUser(validUser);
                    setRedirectPath("/staffdash");
                } else {
                    setErrorMessage('Invalid credentials');
                }
            } else if (typeof staffData === 'object') {
                if (staffData.staffPassword === password) {
                    // Store staffId in sessionStorage
                    sessionStorage.setItem('staffId', staffData.staffId);

                    setLoggedInUser(staffData);
                    setRedirectPath(staffData.staffRole === "admin" ? "/admindash" : "/staffdash");
                } else {
                    setErrorMessage('Invalid credentials');
                }
            } else {
                setErrorMessage('Invalid response format');
            }
        } catch (error) {
            setErrorMessage('Error occurred. Please try again.');
        }
    };

    if (redirectPath) {
        return <Navigate to={redirectPath} state={{ loggedInUser }} />;
    }

    return (
        <div className="admin-login-container">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Display error message */}
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
