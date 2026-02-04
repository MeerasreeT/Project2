import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('student'));
    if (data) setStudent(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/');
  };

  if (!student) {
    return <div className="student-dashboard">No student data found</div>;
  }

  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <h2>Hi {student.name}, Welcome Back!</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-layout">
        <div className="card profile-card">
          <h3>Profile</h3>
          <p><strong>Roll No:</strong> {student.rollno}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Email:</strong> {student.email}</p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h4>Academic Overview</h4>
            <p>Semester: 5</p>
            <p>CGPA: 8.2</p>
          </div>

          <div className="card">
            <h4>Attendance</h4>
            <p>Overall: 86%</p>
            <p>Status: Good</p>
          </div>

          <div className="card">
            <h4>Notifications</h4>
            <p>Internal exam starts next week</p>
          </div>

          <div className="card">
            <h4>Assignments</h4>
            <p>Pending: 1</p>
            <p>Submitted: 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
