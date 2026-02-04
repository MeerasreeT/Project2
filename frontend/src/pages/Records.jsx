import React, { useState, useEffect } from 'react';
import '../styles/Records.css';

const Records = () => {
  const [students, setStudents] = useState([
    { rollno: '101', name: 'Meera', department: 'CS', dob: '2002-05-10', place: 'Coimbatore', email: 'meera@test.com', phonenum: '9876543210', bloodgroup: 'B+' },
    { rollno: '102', name: 'Arun', department: 'IT', dob: '2001-11-21', place: 'Chennai', email: 'arun@test.com', phonenum: '9876501234', bloodgroup: 'O+' }
  ]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(
    (s) =>
      s.rollno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  const handleClose = () => setSelectedStudent(null);

  return (
    <div className="records-page">
      <div className="records-content">
        <h2>Student Records</h2>
        <p>View and manage all student academic data with ease</p>

        <div className="records-top">
          <input
            type="text"
            placeholder="Search by Roll No or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
        </div>

        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.rollno}>
                <td>{s.rollno}</td>
                <td>{s.name}</td>
                <td>{s.department}</td>
                <td>
                  <button onClick={() => handleView(s)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{selectedStudent.name}'s Details</h3>
            <p><strong>Roll No:</strong> {selectedStudent.rollno}</p>
            <p><strong>DOB:</strong> {new Date(selectedStudent.dob).toLocaleDateString()}</p>
            <p><strong>Department:</strong> {selectedStudent.department}</p>
            <p><strong>Place:</strong> {selectedStudent.place}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Phone:</strong> {selectedStudent.phonenum}</p>
            <p><strong>Blood Group:</strong> {selectedStudent.bloodgroup}</p>
            <button className="close-btn" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;
