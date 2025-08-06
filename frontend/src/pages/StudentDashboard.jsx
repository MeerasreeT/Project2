import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css'; 

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem('student'));
    if (studentData) {
      setStudent(studentData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/');
  };

  if (!student) return <p>No student data found</p>;

  return (
    <div className="student-dashboard">
      <div className="welcome-box">
        <h2>Hi {student.name}, Welcome!</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="student-info">
        <p><strong>Roll No:</strong> {student.rollno}</p>
        <p><strong>DOB:</strong> {new Date(student.dob).toLocaleDateString()}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Place:</strong> {student.place}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone Number:</strong> {student.phonenum}</p>
        <p><strong>Blood Group:</strong> {student.bloodgroup}</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
