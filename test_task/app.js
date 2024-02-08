import express from 'express';

import cors from 'cors';
import todoRouter from './routes/api/todo-router.js';
const app = express();

import logger from 'morgan';

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());

app.use('/api/todo', todoRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
