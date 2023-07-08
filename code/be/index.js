import express from 'express';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import sbjsRoutes from './routes/sbjs.js';
import studentRoutes from './routes/student.js';
import teacherRoutes from './routes/teacher.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// const cors = require('cors');
app.use(cors()); //for use of shared resources

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use('/api/tasks', taskRoutes); //call task routers for each url that starts '/api/tasks'
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/sbjs', sbjsRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);

app.listen(8800, () => {
  console.log('Connected');
});
