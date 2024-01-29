import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

const EditTasks = ({editTaskId, fetchTask, fetchTasks}) => {
  const [text, setText] = useState();
  const [date, setDate] = useState(moment().format('MMM Do YY'));
  const [time, setTime] = useState(moment().format('h:mm:ss a'));
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {id: editTaskId, text, date, time, description, reminder};
      await fetch(`${process.env.apiBaseUrl}/${editTaskId}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(taskData)
      });
      fetchTasks();
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const setFileds = async () => {
    try {
      const task = await fetchTask(editTaskId);
      setText(task.text);
      setDate(task.date);
      setTime(task.time);
      setDescription(task.description);
      setReminder(task.reminder);
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    setFileds();
  }, []);

  console.log('reminder', reminder);

  return (
    <React.Fragment>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Task</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={text} />
        </div>

        <div className="form-control">
          <label>Date</label>
          <input type="text" placeholder={date} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-control">
          <label>time</label>
          <input type="text" placeholder="Add time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <div className="form-control">
          <label>Descrption</label>
          <input
            type="text"
            placeholder={description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input type="checkbox" checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>
        <input type="submit" value="Save Task" className="btn btn-block" />
      </form>
    </React.Fragment>
  );
};

export default EditTasks;
