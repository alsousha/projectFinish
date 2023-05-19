import express from 'express';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import cors from 'cors';

const app = express();

// const cors = require('cors');
app.use(cors()); //for use of shared resources
app.use(express.json());
app.use('/api/tasks', taskRoutes); //call task routers for each url that starts '/api/tasks'
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.listen(8800, () => {
  console.log('Connected');
});
