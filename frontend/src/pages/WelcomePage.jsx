import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';
import axios from 'axios';

function WelcomePage() {
  const [isStaff, setIsStaff] = useState(false); // Toggle between student and staff login
  const navigate = useNavigate();

  const [staff, setStaff] = useState({ email: '', password: '' });
  const [student, setStudent] = useState({ rollno: '', dob: '' });

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/staff/login', staff);
      alert(res.data.message);
      navigate('/staff-dashboard');
    } catch (err) {
      alert('Staff Login Failed');
    }
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();

    const formattedDOB = new Date(student.dob)
    try {
      const res = await axios.post('http://localhost:5000/api/students/login',{
        rollno: student.rollno,
        dob: formattedDOB,
      });
      localStorage.setItem('studentData', JSON.stringify(res.data));
      navigate('/student-dashboard');
    } catch (err) {
      alert('Student Login Failed');
    }
  };

  return (
    <div className={`container ${isStaff ? 'active' : ''}`} id="container">
      {/* Student Login Form */}
      {!isStaff && (
        <div className="form-container sign-in">
          <form onSubmit={handleStudentLogin} className="login-content">
            <h1>Student Login</h1>
            <input
              type="text"
              placeholder="Roll No"
              value={student.rollno}
              onChange={(e) => setStudent({ ...student, rollno: e.target.value })}
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={student.dob}
              onChange={(e) => setStudent({ ...student, dob: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Staff Login Form */}
      {isStaff && (
        <div className="form-container sign-up">
          <form onSubmit={handleStaffLogin} className="login-content">
            <h1>Staff Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={staff.email}
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={staff.password}
              onChange={(e) => setStaff({ ...staff, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome to Student Management System</h1>
            <p>Are you a student?</p>
            <button className="hidden" onClick={() => setIsStaff(false)}>Student</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome to Student Management System</h1>
            <p>Are you a staff?</p>
            <button className="hidden" onClick={() => setIsStaff(true)}>Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
