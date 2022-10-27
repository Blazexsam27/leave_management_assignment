import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Navbar from "../Widgets/Navbar";
import { getLeavesInRange } from "../../services/leavesServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/Leaves/CalendarView.css";
import moment from "moment";

export default function CalendarView() {
  const [date, setDate] = useState();
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  const getDatesInRange = (start, end) => {
    const date = new Date(start.getTime());
    let dates = [];
    while (date <= end) {
      let temp = new Date(date);
      dates.push(temp.toISOString().split("T")[0]);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const getLeaves = async () => {
    const date = new Date();
    const temp = [];
    const allLeaves = await getLeavesInRange(
      `${date.getFullYear() - 3}-${date.getMonth()}-${date.getDate() + 1}`,
      `${date.getFullYear() + 3}-${date.getMonth() + 1}-${date.getDate()}`
    );

    allLeaves.map((item) => {
      temp.push(
        ...getDatesInRange(new Date(item.start_date), new Date(item.end_date))
      );
    });
    await setLeaves([...temp]);
  };
  useEffect(() => {
    if (!Cookies.get("access_token"))
      navigate("/", {
        state: { message: "Token Expired Please Sign In Again." },
      });
    getLeaves();
  }, []);

  return (
    <>
      <Navbar />
      <div className="calendar-container">
        <Calendar
          value={date}
          onChange={setDate}
          tileClassName={({ date }) => {
            if (leaves.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return "highlight";
            }
          }}
        />
      </div>
    </>
  );
}
