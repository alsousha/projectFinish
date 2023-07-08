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
// app.get('/reset-password', (req, res) => {
//   console.log('ddddddddddddd');
//   const { token } = req.query;

//   // Verify token validity and expiration
//   const secret = 'your-secret-key'; // Replace with your actual secret key used for token signing
//   const decodedToken = verifyToken(token, secret);

//   if (!decodedToken || isTokenExpired(decodedToken)) {
//     // Token is invalid or expired
//     res.status(400).json({ error: 'Invalid or expired token' });
//     return;
//   }

//   // Token is valid, proceed with password reset
//   // Render password reset form on the client-side
//   res.render('password-reset-form', { token });
// });
app.use('/api/tasks', taskRoutes); //call task routers for each url that starts '/api/tasks'
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/sbjs', sbjsRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);

app.listen(8800, () => {
  console.log('Connected');
});
