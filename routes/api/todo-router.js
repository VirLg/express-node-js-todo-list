import express from 'express';
import * as todoServise from '../../data/index.js';
const todoRouter = express.Router();

todoRouter.get('/', async (req, res) => {
  const result = await todoServise.getAllTodo();

  return res.json(result);
});
todoRouter.get('/:id', async (req, res) => {
  console.log('req', req.params);
  const result = await todoServise.getTodoById(req.params.id);
  return res.json(result);
});
todoRouter.post('/', async (req, res) => {
  const result = await todoServise.addTodo(req.body);
  return res.json(result, null, 2);
});
todoRouter.put('/:id', async (req, res) => {
  const result = await todoServise.updateTodoById(req.params.id, req.body);
  res.json(result);
});
todoRouter.delete('/:id', async (req, res) => {
  const result = await todoServise.deleteTodoById(req.params.id);
  res.json(result);
});

export default todoRouter;
