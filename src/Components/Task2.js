import React from 'react';
import {useState, useEffect} from 'react';
import {FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router';
import Button from './Button';
import Edittasks from './Edittasks';

const Task2 = ({
  task,
  onDelete,
  onToggle,
  onEdit2,
  onEdit,
  showTask,
  newData,
  myid,
  setText,
  setTime,
  setDate,
  setDescription,
  text,
  Date,
  time,
  Reminder,
  Description,
  setReminder
}) => {
  // console.log("task 2 ---", newData);
  const location = useLocation();

  // console.log("task 2 ", showAddTask1)
  // const [showAddTask, setshowAddTask] = useState(false)
  return (
    <>
      <div className={`task ${!task.reminder ? 'reminder' : ''}`} onClick={() => onToggle(task.id)}>
        {location.pathname === '/task' && <Button color="Black" text="Edit" onClick={() => onEdit(task.id)} />}
        {location.pathname === '/task' && task.id === myid && (
          <Edittasks
            onEdit2={onEdit2}
            newData={newData}
            text={text}
            setText={setText}
            setTime={setTime}
            setDate={setDate}
            setDescription={setDescription}
            Date={Date}
            time={time}
            Reminder={Reminder}
            Description={Description}
            setReminder={setReminder}
            showTask={showTask}
          />
        )}

        <h3>
          <Link to="/task">{task.text} </Link>{' '}
        </h3>

        <p>
          <Link to="/task">{task.Date} </Link>{' '}
        </p>

        <p>
          <Link to="/task">{task.time} </Link>{' '}
        </p>

        <p>{task.Description}</p>
      </div>

      <FaTimes style={{color: 'red'}} onClick={() => onDelete(task.id)} />
    </>
  );
};

export default Task2;
