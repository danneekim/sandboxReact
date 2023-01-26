import React from "react";
import { useState } from "react";

const AddTask = () => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  function onInputChange(e) {
    if (e.target.name === "text") setText(e.target.value);
    if (e.target.name === "day") setDay(e.target.value);
    if (e.target.name === "reminder") setReminder(!reminder);
  }

  return (
    <form className="add-form">
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          name="text"
          onChange={onInputChange}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          name="day"
          onChange={onInputChange}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          value={reminder}
          name="reminder"
          onClick={onInputChange}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
