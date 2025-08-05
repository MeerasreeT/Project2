import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setStudent(parsed.student); // your response has a `student` field
    }
  }, []);

  if (!student) return <p>No data found</p>;

  return (
    <div>
      <h2>Welcome, {student.name}</h2>
      <p>Roll No: {student.rollno}</p>
      <p>DOB: {new Date(student.dob).toLocaleDateString()}</p>
      <p>Department: {student.department}</p>
      <p>Place: {student.place}</p>
      <p>Email: {student.email}</p>
      <p>Phone: {student.phonenum}</p>
    </div>
  );
};

export default StudentDashboard;
