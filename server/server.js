import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import staffRoutes from './routes/staffRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use ('/api/staff', staffRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
mongoose. connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  }).catch (err => console.log(err))