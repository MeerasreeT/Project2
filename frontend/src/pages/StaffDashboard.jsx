import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StaffDashboard.css';

const BACKEND_URL = 'https://project2-backend.onrender.com/api/staff/students';

const StaffDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
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
      const res = await axios.get(BACKEND_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({
      rollno: '',
      name: '',
      dob: '',
      department: '',
      place: '',
      email: '',
      phonenum: '',
      bloodgroup: ''
    });
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setIsEdit(true);
    setFormData(student);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${BACKEND_URL}/${formData._id}`, formData);
      } else {
        await axios.post(BACKEND_URL, formData);
      }
      setShowForm(false);
      fetchStudents();
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${BACKEND_URL}/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student:', err);
      }
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.rollno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by Roll No or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

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
          {filteredStudents.map(student => (
            <tr key={student._id}>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setSelectedStudent(student)}>View</button>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{selectedStudent.name}'s Details</h3>
            <p><b>Roll No:</b> {selectedStudent.rollno}</p>
            <p><b>Name:</b> {selectedStudent.name}</p>
            <p><b>DOB:</b> {new Date(selectedStudent.dob).toLocaleDateString()}</p>
            <p><b>Department:</b> {selectedStudent.department}</p>
            <p><b>Place:</b> {selectedStudent.place}</p>
            <p><b>Email:</b> {selectedStudent.email}</p>
            <p><b>Phone:</b> {selectedStudent.phonenum}</p>
            <p><b>Blood Group:</b> {selectedStudent.bloodgroup}</p>
            <button onClick={() => setSelectedStudent(null)}>Close</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{isEdit ? 'Edit Student' : 'Add Student'}</h3>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map(key =>
                key !== '_id' && (
                  <input
                    key={key}
                    type={key === 'dob' ? 'date' : 'text'}
                    placeholder={key.toUpperCase()}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    required
                  />
                )
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit">{isEdit ? 'Update' : 'Save'}</button>
                <button type="button" className="danger" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
