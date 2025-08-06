import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  const [studentRoll, setStudentRoll] = useState('');
  const [studentDOB, setStudentDOB] = useState('');

  const navigate = useNavigate();

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/staff/login', {
        email: staffEmail,
        password: staffPassword,
      });
      if (res.status === 200) {
        navigate('/staff-dashboard');
      }
    } catch (error) {
      alert('Invalid Staff Credentials');
    }
  };
 const handleStudentLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/students/login', {
      rollno: studentRoll,
      dob: studentDOB
    });
    localStorage.setItem('student', JSON.stringify(res.data));
    navigate('/student-dashboard');
  } catch (err) {
    alert('Invalid roll number or date of birth');
  }
};

  
  return (
    <div className="welcome-page">
      <nav className="navbar">
        <h1 className="logo">Student Management System</h1>
        <ul className="nav-links">
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/records')}>Records</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        <div className="login-buttons">
          <button onClick={() => setShowStaffModal(true)}>Staff Login</button>
          <button onClick={() => setShowStudentModal(true)}>Student Login</button>
        </div>
      </nav>

      {showStaffModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Staff Login</h2>
            <form onSubmit={handleStaffLogin}>
              <input
                type="email"
                placeholder="Email"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowStaffModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      
      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Student Login</h2>
            <form onSubmit={handleStudentLogin}>
              <input
                type="text"
                placeholder="Roll Number"
                value={studentRoll}
                onChange={(e) => setStudentRoll(e.target.value)}
                required
              />
              <input
                type="date"
                value={studentDOB}
                onChange={(e) => setStudentDOB(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowStudentModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="hero-section">
        <h2>Welcome to the Student Management System</h2>
        <p>Efficient | Secure | Easy to Use</p>
      </div>

      <footer className="footer">
        <p>© 2025 Student Management System | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
