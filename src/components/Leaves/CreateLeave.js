import React, { useState } from "react";
import "../styles/Leaves/CreateLeave.css";
import DatePicker from "react-date-picker";

export default function CreateLeave() {
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  return (
    <div className="create-leave-container">
      <div className="header">
        <p>
          LEAVE <span>MANAGEMENT</span>
        </p>
      </div>
      <div className="leave-form">
        <form className="create-leave-form">
          <p className="create-leave-header">Create Leave</p>
          <label htmlFor="start_date">Start date: </label>
          <DatePicker value={start_date} onChange={setStartDate} />
          <label htmlFor="end_date">End date: </label>
          <DatePicker value={end_date} onChange={setEndDate} />
          <label htmlFor="reason">Reason: </label>
          <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
          <button className="create-leave-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
