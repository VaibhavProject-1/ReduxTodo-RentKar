import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../redux/actions/todoActions';
import './UpdateTodoModal.css';
import { useSnackbar } from 'notistack';

const UpdateTodoModal = ({ id, currentName, currentDescription, onUpdate, onClose }) => {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async () => {
    try {
      // Create the updated todo object
      const updatedTodo = {
        _id: id,
        name,
        description,
        // Assuming the todo has a completed field
        completed: false, // You may need to adjust this based on your actual data structure
      };
  
      // Dispatch the updateTodo action with the updated todo object
      dispatch(updateTodo(id, name, description));

  
      // Call the onUpdate function with the updated todo
      onUpdate(updatedTodo);
  
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating todo:', error.message);
      enqueueSnackbar('Error updating todo!', { variant: 'error' });
    }
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