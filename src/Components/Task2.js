import React from 'react';
import {FaTimes, FaEdit} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const Task2 = ({task, onDelete, setEditTaskId, onToggle}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditTaskId(task.id);
    navigate('edittask');
  };

  return (
    <div>
      <FaEdit style={{color: 'black'}} onClick={handleEdit} cursor="pointer" />
      <div className={`task ${task.reminder ? 'reminder' : ''}`} onClick={() => onToggle(task.id)}>
        <h3>{task.text}</h3>
        <p>{task.Date}</p>
        <p>{task.time}</p>
        <p>{task.Description}</p>
      </div>
      <FaTimes style={{color: 'red'}} onClick={() => onDelete(task.id)} />
    </div>
  );
};

export default Task2;
