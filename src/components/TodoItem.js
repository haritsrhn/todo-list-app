import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleChange = () => {
    toggleCompleted(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editText);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" checked={task.completed} onChange={handleChange} />

      {isEditing ? (
        <>
          <input
            className="update-task"
            placeholder="Update task"
            type="text"
            value={editText}
            onChange={handleInputChange}
            autoFocus
          />

          <FontAwesomeIcon
            className="check-icon"
            icon={faCircleCheck}
            onClick={handleSave}
          />
        </>
      ) : (
        <p>{task.text}</p>
      )}

      <div className="task">
        <p>{task.date}</p>
        <p>{task.time}</p>
      </div>

      {!isEditing && (
        <>
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            className="delete-icon"
            icon={faTrash}
            onClick={() => deleteTask(task.id)}
          />
        </>
      )}
    </div>
  );
}

export default TodoItem;
