
import Student from '../models/Student.js'


export const staffLogin = async (req, res) => {
    const { email, password } = req.body;
    if( email === 'admin123@gmail.com' && password === '123456') {
        return res.status(200).json({ message: "Login successful" });

    }
    return res.status(401).json({ message: "Invalid credentials" });

};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};  