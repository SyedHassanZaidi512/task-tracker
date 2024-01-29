import React from 'react';
import {useState} from 'react';
import moment from 'moment';

const AddTask = ({onAdd}) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(moment().format('MMM Do YY'));
  const [time, setTime] = useState(moment().format('h:mm:ss a'));
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return alert('Please add a task');
    }
    onAdd({text, date, time, description, reminder});
    setText('');
    setDate('');
    setTime('');
    setDescription('');
    setReminder(false);
    alert('Task added successfully');
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Task" />
      </div>

      <div className="form-control">
        <label>Date</label>
        <input type="text" placeholder="Add Date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="form-control">
        <label>Time</label>
        <input type="text" placeholder="Add Time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div className="form-control">
        <label>Descrption</label>
        <input
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
