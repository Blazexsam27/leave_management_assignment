import React, { useState } from "react";
import "../styles/Leaves/CreateLeave.css";
import DatePicker from "react-date-picker";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

export default function CreateLeave() {
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    start_date.toLocaleDateString().replace(/\//g, "-");
    end_date.toLocaleDateString().replace(/\//g, "-");
    fetch("https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        reason: reason,
      }),
    })
      .then((response) => {
        navigate("/", { state: { message: "Leave Created Successfully" } });
      })
      .catch((err) => {
        navigate("/", {
          state: { message: "Leave Creation Failed", err: err },
        });
      });
  };

  return (
    <div className="create-leave-container">
      <div className="header">
        <p>
          LEAVE <span>MANAGEMENT</span>
        </p>
        <div className="menu">
          <Link to={"/"}>Home</Link>
          <Link to={"/listing"}>Listing</Link>
        </div>
      </div>
      <div className="leave-form">
        <form className="create-leave-form" onSubmit={handleSubmit}>
          <p className="create-leave-header">Create Leave</p>
          <label htmlFor="start_date">Start date: </label>
          <DatePicker value={start_date} onChange={setStartDate} />
          <label htmlFor="end_date">End date: </label>
          <DatePicker value={end_date} onChange={setEndDate} />
          <label htmlFor="reason">(Optional) Reason: </label>
          <textarea
            name="reason"
            id="reason"
            cols="30"
            rows="10"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <button className="create-leave-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
