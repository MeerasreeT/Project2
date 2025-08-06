
import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About</h2>
      <p className="about-typing">
        This system helps manage student data efficiently. Staff can add, update, or delete student records, 
        while students can log in to view their personal academic details.
      </p>
    </div>
  );
};

export default About;
