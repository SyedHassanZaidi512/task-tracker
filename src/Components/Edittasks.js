import React from 'react';
import {useEffect} from 'react';

const Edittasks = ({
  id,
  onEdit2,
  setText,
  setTime,
  setDate,
  setDescription,
  text,
  Date,
  time,
  Reminder,
  Description,
  setReminder,
  showTask
}) => {
  const onSubmit = (e) => {
    if (!text) {
      alert('Please add a task');
      return;
    }

    onEdit2({text, Date, time, Description, Reminder, showTask});
  };

  return (
    <React.Fragment>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Task</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={text} />
        </div>

        <div className="form-control">
          <label>Date</label>
          <input type="text" placeholder={Date} value={Date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-control">
          <label>time</label>
          <input type="text" placeholder="Add time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <div className="form-control">
          <label>Descrption</label>
          <input
            type="text"
            placeholder={Description}
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
    </React.Fragment>
  );
};

export default Edittasks;
