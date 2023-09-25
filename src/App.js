import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';

import Header from './Components/Header';
import Task from './Components/Task';
import Addtask from './Components/Addtask';
import Footer from './Components/Footer';
import Button from './Components/Button.js';
import Edittasks from './Components/Edittasks';
import About from './Components/About';

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, settasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/tasks');
      const tasksData = await res.json();
      settasks(tasksData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const Addtaskfunc = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(task)
      });
      const data = await res.json();
      settasks([...tasks, data]);
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});
      fetchTasks();
    } catch (error) {
      console.log('error', error);
    }
  };

  const togglereminder = async (id) => {
    try {
      const taskToToggle = await fetchTask(id);
      const udpTask = {...taskToToggle, reminder: !taskToToggle.reminder};
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(udpTask)
      });
      fetchTasks();
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <Header title="Task Tracker" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Button
                color={showAddTask ? 'red' : 'green'}
                text={showAddTask ? 'close' : 'Add'}
                onClick={() => setshowAddTask(!showAddTask)}
              />

              {showAddTask && <Addtask onAdd={Addtaskfunc} />}
              {tasks.length > 0 ? (
                <Task
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={togglereminder}
                  setEditTaskId={setEditTaskId}
                  showAddtask={showAddTask}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        <Route
          path="/edittask"
          element={<Edittasks editTaskId={editTaskId} fetchTask={fetchTask} fetchTasks={fetchTasks} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
