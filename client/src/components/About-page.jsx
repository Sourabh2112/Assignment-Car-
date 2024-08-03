import React from 'react';
import './About-page.css'; // Optional: For custom styling

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1>About Me</h1>
            <div className="contact-info">
                <p>
                    <strong>Contact Information:</strong>
                </p>
                <p className="contact-item">
                    Mobile: 7992325836
                </p>
                <p className="contact-item">
                    Email: <a href="mailto:sourabhsbg01@gmail.com" className="contact-link">sourabhsbg01@gmail.com</a>
                </p>
                <p className="contact-item">
                    GitHub: <a href="https://github.com/Sourabh2112" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/sourabh-kumar</a>
                </p>
            </div>
            <p className="about-details">
                I'm Sourabh, a college student and a tech enthusiast. I'm also a Full-Stack developer who likes to work with JavaScript/Typescript, C#, ASP.NET, and other technologies. Always open to collaborating on projects and innovative, disruptive ideas. Let's connect and build something amazing together!
            </p>
            <div className="resume-container">
                <img
                    src="/images/resume.jpg" // Path relative to the public folder
                    alt="My Resume"
                    className="resume-image"
                />
            </div>
        </div>
    );
};

export default AboutPage;
