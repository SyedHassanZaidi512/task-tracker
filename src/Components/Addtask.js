import React from 'react';
import {useState} from 'react';
import moment from 'moment';

const Addtask = ({onAdd, editData}) => {
  const [showTask, setshowTask] = useState(false);
  const [text, settext] = useState('');
  const [Date, setDate] = useState(moment().format('MMM Do YY'));
  const [time, setTime] = useState(moment().format('h:mm:ss a'));
  const [Description, setDescription] = useState('');
  const [Reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task');
      return;
    }

    onAdd({text, Date, time, Description, Reminder, showTask});
    settext('');
    setDate('');
    setTime('');
    setDescription('');
    setReminder(false);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text" value={text} onChange={(e) => settext(e.target.value)} placeholder="Task" />
      </div>

      <div className="form-control">
        <label>Date</label>
        <input type="text" placeholder="Add Date" value={Date} />
      </div>

      <div className="form-control">
        <label>Time</label>
        <input type="text" placeholder="Add Time" value={time} />
      </div>

      <div className="form-control">
        <label>Descrption</label>
        <input
          type="text"
          placeholder="Add Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" value={Reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default Addtask;
