import React, { useState, useEffect } from 'react';
import TODOITEM from './todoitem';

function TOLIST() {
  const getTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const [todos, setTodos] = useState(getTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState('');
  const [editMode, setEditMode] = useState(false); // Track which todo is in edit mode
  const [editText, setEditText] = useState('');   // Store the text being edited

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const editTodo = (id, text) => {
    setEditMode(id); // Set the id of the todo being edited
    setEditText(text); // Initialize with the current text of the todo
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditMode(null);
    setEditText('');
  };

  const deleteTodo = (id) => {
    
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleChange = (e) => {
    setNewTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text: newTodoText,
      time: new Date().toLocaleString(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  return (
    <div className="App">
    
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoText}
          onChange={handleChange}
          placeholder="Add a new task"
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="todo-list">
        {todos.map(todo => (
          <TODOITEM
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            editTodo={editTodo} // Pass the function directly
            deleteTodo={deleteTodo}
            isEditing={editMode === todo.id}
            editText={editText}
            handleEditChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
          />
        ))}
      </div>
    </div>
  );
}

export default TOLIST;
