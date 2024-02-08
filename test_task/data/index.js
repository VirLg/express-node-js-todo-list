import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
const todoPath = path.resolve('data', 'todo.json');
const updateTodo = allTodo =>
  fs.writeFile(todoPath, JSON.stringify(allTodo, null, 2));

export const getAllTodo = async () => {
  const bufer = await fs.readFile(todoPath);

  return JSON.parse(bufer);
};
export const getTodoById = async id => {
  const allTodo = await getAllTodo();
  const todo = allTodo.find(item => item._id === id);

  return todo || null;
};
export const addTodo = async ({ name }) => {
  const allTodo = await getAllTodo();
  const newTodo = {
    _id: nanoid(),
    name,
    completed: false,
  };
  allTodo.push(newTodo);
  await updateTodo(allTodo);
  return newTodo;
};
export const updateTodoById = async (id, { name, completed }) => {
  const allTodo = await getAllTodo();
  const index = allTodo.findIndex(item => item._id === id);
  if (index === -1) {
    return null;
  }
  allTodo[index] = { _id: id, name, completed };
  await updateTodo(allTodo);
  return allTodo[index];
};

export const deleteTodoById = async id => {
  const allTodo = await getAllTodo();
  const index = allTodo.findIndex(item => item._id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allTodo.splice(index, 1);

  await updateTodo(allTodo);
  return result;
};
