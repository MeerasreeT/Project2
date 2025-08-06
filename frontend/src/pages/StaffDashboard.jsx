import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StaffDashboard.css';

const StaffDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    rollno: '',
    name: '',
    dob: '',
    department: '',
    place: '',
    email: '',
    phonenum: '',
    bloodgroup: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/staff/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/staff/students/${id}`);
        fetchStudents(); 
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/staff/students', newStudent);
      setNewStudent({
        rollno: '',
        name: '',
        dob: '',
        department: '',
        place: '',
        email: '',
        phonenum: '',
        bloodgroup: ''
      });
      setShowAddForm(false);
      fetchStudents();
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const filteredStudents = students.filter(student =>
    student.rollno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2>Staff Dashboard</h2>

    
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by Roll No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>Add +</button>
      </div>

      
      {showAddForm && (
        <form className="add-form" onSubmit={handleAddStudent}>
          {Object.entries(newStudent).map(([key, value]) => (
            <input
              key={key}
              type={key === 'dob' ? 'date' : 'text'}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={(e) =>
                setNewStudent({ ...newStudent, [key]: e.target.value })
              }
              required
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      )}

     
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleView(student)}>View</button>
                <button>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="view-card">
          <h3>Student Details</h3>
          <p><strong>Roll No:</strong> {selectedStudent.rollno}</p>
          <p><strong>Name:</strong> {selectedStudent.name}</p>
          <p><strong>DOB:</strong> {new Date(selectedStudent.dob).toLocaleDateString()}</p>
          <p><strong>Department:</strong> {selectedStudent.department}</p>
          <p><strong>Phone:</strong> {selectedStudent.phonenum}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Blood Group:</strong> {selectedStudent.bloodgroup}</p>
          <button onClick={() => setSelectedStudent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
