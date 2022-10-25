import React, { useState } from "react";
import "../styles/Leaves/EditLeave.css";
import DatePicker from "react-date-picker";

export default function EditLeave() {
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves", {
      method: "POST",
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: localStorage.getItem("access_token"),
      },
    });
  };

  return (
    <div className="edit-leave-container">
      <div className="header">
        <p>
          LEAVE <span>MANAGEMENT</span>
        </p>
      </div>
      <div className="leave-form">
        <form className="edit-leave-form" onSubmit={handleSubmit}>
          <p className="edit-leave-header">Edit Leave</p>
          <label htmlFor="start_date">Start date: </label>
          <DatePicker value={start_date} onChange={setStartDate} />
          <label htmlFor="end_date">End date: </label>
          <DatePicker value={end_date} onChange={setStartDate} />
          <label htmlFor="reason">Reason: </label>
          <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
          <button className="edit-leave-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
