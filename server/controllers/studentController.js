import Student from '../models/Student.js';

export const studentLogin = async (req, res) => {
  // ✅ Prevent crash if req.body is missing
  if (!req.body || !req.body.rollno || !req.body.dob) {
    return res.status(400).json({ message: 'Roll number and DOB are required.' });
  }

  const { rollno, dob } = req.body;

  try {
    const inputDate = new Date(dob);
    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

    const student = await Student.findOne({
      rollno,
      dob: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', student });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
