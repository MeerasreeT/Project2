import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

    rollno: String,
    name: String,
    dob: Date,
    department: String,
    place: String,
    email: String,
    phonenum: String,
    bloodgroup: String
})

export default mongoose.model('Student', studentSchema);