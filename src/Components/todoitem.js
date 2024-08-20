import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

function TODOITEM({ todo, toggleComplete, editTodo, deleteTodo, isEditing, editText, handleEditChange, handleEditSubmit }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="todo-checkbox"
      />
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            onBlur={() => handleEditSubmit(todo.id)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleEditSubmit(todo.id);
              }
            }}
            className="todo-edit-input"
          />
        ) : (
          <>
            <span className="todo-text">{todo.text}</span>
            <span className="todo-time">{todo.time}</span>
          </>
        )}
      </div>
      <div className="todo-actions">
        
        <button onClick={() => deleteTodo(todo.id)} className="todo-delete">
          🗑️
        </button>
        {!isEditing && (
          <button onClick={() => editTodo(todo.id, todo.text)} className="todo-edit">
            ✏️
          </button>
        )}
      </div>
    </div>
  );
}

TODOITEM.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editText: PropTypes.string.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
};

export default TODOITEM;
