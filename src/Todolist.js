import React, { useState } from 'react';
import './Todolist.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not completed');
  const [filter, setFilter] = useState('all');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      taskName,
      description,
      status,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTaskName('');
    setDescription('');
    setStatus('not completed');
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodoId(id);
    setTaskName(todoToEdit.taskName);
    setDescription(todoToEdit.description);
    setStatus(todoToEdit.status);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingTodoId) {
        return {
          ...todo,
          taskName,
          description,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setTaskName('');
    setDescription('');
    setStatus('not completed');
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === 'not completed' ? 'completed' : 'not completed',
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.status === 'completed';
    }
    if (filter === 'not completed') {
      return todo.status === 'not completed';
    }
    return true;
  });

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="row">
        <div className="column">
          <input type="text" value={taskName} onChange={handleTaskNameChange} placeholder="Task Name" />
        </div>
        <div className="column">
          <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
        </div>
        <div className="column">
          <button onClick={editingTodoId ? handleUpdateTodo : handleAddTodo}>
            {editingTodoId ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
      </div>
      <div className="filter">
        <h1>Status Filter</h1>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-details">
              <h3>{todo.taskName}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="todo-actions">
              <p>Status:     {todo.status}</p>
              <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button
                onClick={() => handleToggleStatus(todo.id)}
                className={`button ${todo.status === 'completed' ? 'completed' : 'not-completed'}`}
              >
                Change Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
