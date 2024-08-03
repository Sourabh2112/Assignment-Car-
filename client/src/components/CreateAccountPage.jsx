import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
    const [name, setName] = useState();
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()

    const baseUrl = 'https://assignment-car.vercel.app';

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${baseUrl}/register`, { name, role, email, password })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>Assignment for Quadiro Technologies</h1>
            <div className="create-account-page">
                <h2>Create Account</h2>
                <form>
                    <label>
                        Name:
                        <input
                            type="text"
                            placeholder='Enter Name'
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Role:
                        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>

                        </select>
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleSubmit} className="signup-btn">Sign up</button>
                    <Link to="/login">
                        <button className="login-btn">Log in</button>
                    </Link>
                </form>
            </div>
        </>
    );
}

export default CreateAccountPage;