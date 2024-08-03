import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://assignment-car.vercel.app/login', { email, password }, {
            withCredentials: true 
        })
            .then(response => {
                console.log(response.data);
                if (response.data.message === 'Success') {
                    if (response.data.role === 'user') {
                        navigate("/api/user");
                    } else if (response.data.role === 'admin') {
                        navigate("/api/admin");
                    } else {
                        console.log('Unknown role:', response.data.role);
                    }
                } else {
                    alert(response.data.message); // Display error message
                }
            })
            .catch(error => {
                console.error('Error logging in:', error); // Improved error handling
                if (error.response) {
                    console.error('Server responded with a status code outside 2xx range:', error.response.data);
                } else if (error.request) {
                    console.error('No response received from server:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            });
    };

    return (
        <>
            <h1>Assignment for Quadiro Technologies</h1>
            <div className="login-page">
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button className="loginPage-btn">Login</button>
                </form>
                <Link to="/signup">
                    <button className="create-account-btn">Create Account</button>
                </Link>
            </div>
        </>
    );
}

export default LoginPage;