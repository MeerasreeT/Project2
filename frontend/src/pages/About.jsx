import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h2 className="about-title">About Student Management System</h2>

      <div className="about-cards">
        <div className="about-card">
          <h3>System Overview</h3>
          <p>
            A centralized platform to manage student records efficiently,
            reducing paperwork and improving accuracy.
          </p>
        </div>

        <div className="about-card">
          <h3>User Roles</h3>
          <p>
            Staff can add, update, and delete records while students can
            securely view their own information.
          </p>
        </div>

        <div className="about-card">
          <h3>Key Features</h3>
          <p>
            Secure login, role-based access, clean UI, and fast data handling
            for academic management.
          </p>
        </div>

        <div className="about-card">
          <h3>Technology Stack</h3>
          <p>
            Built using MERN Stack — React, Node.js, Express, and MongoDB
            following modern standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
