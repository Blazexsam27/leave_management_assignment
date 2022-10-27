import React, { useEffect, useState } from "react";
import "../styles/Leaves/EditLeave.css";
import DatePicker from "react-date-picker";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function EditLeave() {
  const location = useLocation();
  const navigate = useNavigate();
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");

  useEffect(() => {
    setStartDate(new Date(location.state.start_date));
    setEndDate(new Date(location.state.end_date));
    setReason(location.state.reason);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?id=eq.${location.state.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.REACT_APP_API_KEY,
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          start_date: start_date.toISOString().split("T")[0],
          end_date: end_date.toISOString().split("T")[0],
          reason: reason,
        }),
      }
    )
      .then((response) =>
        navigate("/listing", {
          state: { message: "Leave Updated Successfully" },
        })
      )
      .catch((err) =>
        navigate("/listing", {
          state: { message: "Leave update failed", err: err },
        })
      );
  };

  return (
    <div className="edit-leave-container">
      <div className="header">
        <p>
          LEAVE <span>MANAGEMENT</span>
        </p>
        <div className="menu">
          <Link to={"/"}>Home</Link>
          <Link to={"/listing"}>Listing</Link>
          <Link to={"/createleave"}>Create</Link>
        </div>
      </div>
      <div className="leave-form">
        <form className="edit-leave-form" onSubmit={handleSubmit}>
          <p className="edit-leave-header">Edit Leave</p>
          <label htmlFor="start_date">Start date: </label>
          <DatePicker value={start_date} onChange={setStartDate} />
          <label htmlFor="end_date">End date: </label>
          <DatePicker value={end_date} onChange={setEndDate} />
          <label htmlFor="reason">Reason: </label>
          <textarea
            name="reason"
            id="reason"
            cols="30"
            rows="10"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <button className="edit-leave-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
