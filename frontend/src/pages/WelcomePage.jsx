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

  const BACKEND_URL = 'https://project2-backend.onrender.com';

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/staff/login`, {
        email: staffEmail,
        password: staffPassword,
      });
      if (res.status === 200) {
        navigate('/staff-dashboard');
      }
    } catch (err) {
      alert('Invalid Staff Credentials');
    }
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/students/login`, {
        rollno: studentRoll,
        dob: studentDOB,
      });
      localStorage.setItem('student', JSON.stringify(res.data));
      navigate('/student-dashboard');
    } catch (err) {
      alert('Invalid Roll Number or DOB');
    }
  };

  return (
    <div className="welcome-page">
      <nav className="navbar">
        <h1 className="logo">SMS</h1>
        <ul className="nav-links">
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/records')}>Records</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        <div className="nav-actions">
          <button onClick={() => setShowStaffModal(true)}>Staff</button>
          <button className="outline" onClick={() => setShowStudentModal(true)}>Student</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-card">
          <h2>Student Management System</h2>
          <p>Secure • Scalable • Professional Academic Platform</p>
          <div className="hero-buttons">
            <button onClick={() => setShowStaffModal(true)}>Staff Portal</button>
            <button className="outline" onClick={() => setShowStudentModal(true)}>Student Portal</button>
          </div>
        </div>
      </section>

      {showStaffModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Staff Login</h3>
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
              <button type="button" className="danger" onClick={() => setShowStaffModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Student Login</h3>
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
              <button type="button" className="danger" onClick={() => setShowStudentModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        © 2025 Student Management System • Built with MERN Stack
      </footer>
    </div>
  );
};

export default WelcomePage;
