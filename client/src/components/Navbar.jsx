// Navbar.js
import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About-page">About</Link></li>
                {/* <li><Link to="/">Contact</Link></li> */}
            </ul>
        </nav>
    );
};

export default Navbar;