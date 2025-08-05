import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StaffDashboard.css';

const StaffDashboard = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
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
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  const handleView = (student) => {
    setViewStudent(student);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setFormData({ ...student, dob: student.dob.substring(0, 10) }); // format DOB
  };

  const handleAdd = () => {
    setEditStudent(null);
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
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editStudent) {
        // Edit existing
        await axios.put(`http://localhost:5000/api/students/${editStudent._id}`, formData);
      } else {
        // Add new
        await axios.post('http://localhost:5000/api/students', formData);
      }
      fetchStudents();
      setEditStudent(null);
      setFormData({});
    } catch (err) {
      console.error('Form submission failed', err);
    }
  };

  const filteredStudents = students.filter((stu) =>
    stu.rollno.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Staff Dashboard</h1>

      {viewStudent ? (
        <div className="card-view">
          <h3>Student Details</h3>
          <p><strong>Roll No:</strong> {viewStudent.rollno}</p>
          <p><strong>Name:</strong> {viewStudent.name}</p>
          <p><strong>DOB:</strong> {new Date(viewStudent.dob).toLocaleDateString()}</p>
          <p><strong>Department:</strong> {viewStudent.department}</p>
          <p><strong>Place:</strong> {viewStudent.place}</p>
          <p><strong>Email:</strong> {viewStudent.email}</p>
          <p><strong>Phone:</strong> {viewStudent.phonenum}</p>
          <p><strong>Blood Group:</strong> {viewStudent.bloodgroup}</p>
          <button onClick={() => setViewStudent(null)}>Back to Table</button>
        </div>
      ) : editStudent || formData.rollno ? (
        <form className="student-form" onSubmit={handleFormSubmit}>
          <h3>{editStudent ? 'Edit Student' : 'Add Student'}</h3>
          {Object.entries(formData).map(([key, value]) => (
            <input
              key={key}
              type={key === 'dob' ? 'date' : 'text'}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              required
            />
          ))}
          <button type="submit">{editStudent ? 'Update' : 'Add'}</button>
          <button onClick={() => setFormData({})}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="top-bar">
            <input
              type="text"
              placeholder="Search by Roll No"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="add-button" onClick={handleAdd}>+ Add Student</button>
          </div>

          <table className="student-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4">No data found</td>
                </tr>
              ) : (
                filteredStudents.map((stu) => (
                  <tr key={stu._id}>
                    <td>{stu.rollno}</td>
                    <td>{stu.name}</td>
                    <td>{new Date(stu.dob).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleView(stu)}>View</button>
                      <button onClick={() => handleEdit(stu)}>Edit</button>
                      <button onClick={() => handleDelete(stu._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StaffDashboard;
