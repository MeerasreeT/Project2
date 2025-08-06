import Student from '../models/Student.js';

export const studentLogin = async (req, res) => {
  const { rollno, dob } = req.body;

  try {
    const student = await Student.findOne({ rollno, dob });

    if (!student) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
