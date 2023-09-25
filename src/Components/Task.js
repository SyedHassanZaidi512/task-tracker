import Task2 from './Task2';
// import Button from "./Button"
// import { useLocation } from "react-router"

const Task = ({tasks, onDelete, onToggle, onEdit, setEditTaskId}) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task2
          key={index}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
          setEditTaskId={setEditTaskId}
        />
      ))}
    </>
  );
};

export default Task;
