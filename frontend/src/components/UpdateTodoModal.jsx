import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../redux/actions/todoActions';
import './UpdateTodoModal.css'; // Import CSS file for styling

const UpdateTodoModal = ({ id, currentName, currentDescription, onClose }) => {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateTodo(id, name, description));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Todo</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-textarea"
        ></textarea>
        <div className="modal-buttons">
          <button onClick={handleUpdate} className="modal-button update-button">
            Update
          </button>
          <button onClick={onClose} className="modal-button cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodoModal;