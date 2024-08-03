import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const baseUrl = 'https://assignment-car.vercel.app';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://assignment-car.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Equivalent to `withCredentials: true` in axios
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === 'Success') {
                    if (data.role === 'user') {
                        navigate("/api/user");
                    } else if (data.role === 'admin') {
                        navigate("/api/admin");
                    } else {
                        console.log('Unknown role:', data.role);
                    }
                } else {
                    alert(data.message); // Display error message
                }
            } else {
                console.error('Server responded with an error:', data);
                alert('An error occurred: ' + data.message); // Display server error message
            }
        } catch (error) {
            console.error('Error logging in:', error); // Improved error handling
            alert('An error occurred: ' + error.message); // Display error message
        }
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