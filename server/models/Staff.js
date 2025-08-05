import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    email: String,
    password: String
});

export default mongoose.model('Staff', staffSchema);