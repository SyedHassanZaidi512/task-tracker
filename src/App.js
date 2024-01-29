import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';

import Header from './Components/Header';
import Task from './Components/Task';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import Button from './Components/Button.js';
import EditTasks from './Components/EditTasks';
import About from './Components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState('');

  const apiBaseUrl = 'http://localhost:5000/tasks';

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:5000/tasks`);
      const tasksData = await res.json();
      console.log('tasksData', res);
      setTasks(tasksData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTask = async (id) => {
    try {
      const res = await fetch(`${apiBaseUrl}/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const addTaskFunc = async (task) => {
    try {
      const res = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(task)
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setShowAddTask(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${apiBaseUrl}/${id}`, {method: 'DELETE'});
      fetchTasks();
    } catch (error) {
      console.log('error', error);
    }
  };

  const togglereminder = async (id) => {
    try {
      const taskToToggle = await fetchTask(id);
      const udpTask = {...taskToToggle, reminder: !taskToToggle.reminder};
      await fetch(`${apiBaseUrl}${id}`, {
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
                onClick={() => setShowAddTask(!showAddTask)}
              />

              {showAddTask && <AddTask onAdd={addTaskFunc} />}
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
          element={<EditTasks editTaskId={editTaskId} fetchTask={fetchTask} fetchTasks={fetchTasks} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
