import React, { useEffect, useState } from "react";
import "../styles/Leaves/Listing.css";
import {
  parseDate,
  deleteLeave,
  getLeavesInRange,
  getMonthName,
  getCurrentMonthLeaves,
  getPastMonthLeaves,
  getPast6MonthsLeaves,
  getPast1YearLeaves,
} from "../../services/leavesServices";
import Navbar from "../Widgets/Navbar";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";

export default function Listing() {
  const date = new Date();
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [pastLeaves, setPastLeaves] = useState([]);
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const handleFilter = async (filter) => {
    setIsloading(true);
    switch (filter) {
      case "current":
        setUpcomingLeaves((await getCurrentMonthLeaves()).upcomingLeaves);
        setPastLeaves((await getCurrentMonthLeaves()).pastLeaves);
        setIsloading(false);
        break;
      case "past":
        setUpcomingLeaves([]);
        setPastLeaves(await getPastMonthLeaves());
        setIsloading(false);
        break;
      case "6months":
        setUpcomingLeaves([]);
        setPastLeaves(await getPast6MonthsLeaves());
        setIsloading(false);
        break;
      case "1year":
        setUpcomingLeaves([]);
        setPastLeaves(await getPast1YearLeaves());
        setIsloading(false);
        break;
      default:
        getLeaves();
        setIsloading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedStartDate = parseDate(start_date);
    const parsedEndDate = parseDate(end_date);
    setUpcomingLeaves(await getLeavesInRange(start_date, end_date));
  };

  const getLeaves = async () => {
    setIsloading(true);
    setPastLeaves(
      await getLeavesInRange(
        `${date.getFullYear() - 5}-${date.getMonth()}-${date.getDate() + 1}`,
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      )
    );
    setUpcomingLeaves(
      await getLeavesInRange(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`,
        `${date.getFullYear() + 1}-${date.getMonth() + 1}-${date.getDate() + 1}`
      )
    );
    setIsloading(false);
  };

  const handleDelete = (leave_id) => {
    deleteLeave(leave_id);
    const remainingLeaves = upcomingLeaves.filter(
      (item) => item.id != leave_id
    );
    setUpcomingLeaves(remainingLeaves);
  };

  useEffect(() => {
    getLeaves();
  }, []);

  return (
    <>
      <Navbar />

      <div className="listing-container">
        <div className="filters">
          <div className="filter-tabs" onClick={() => handleFilter("all")}>
            All
          </div>
          <div className="filter-tabs" onClick={() => handleFilter("current")}>
            {getMonthName(date.getMonth())}
          </div>
          <div className="filter-tabs" onClick={() => handleFilter("past")}>
            {getMonthName(date.getMonth() - 1)}
          </div>
          <div className="filter-tabs" onClick={() => handleFilter("6months")}>
            Last 6 Months
          </div>
          <div className="filter-tabs" onClick={() => handleFilter("1year")}>
            Last 1 Year
          </div>
        </div>
        <form className="custom-filter" onSubmit={handleSubmit}>
          <label htmlFor="start_date_filter">Start Date: </label>
          <DatePicker value={start_date} onChange={setStartDate} />
          <label htmlFor="end_date_filter">End Date: </label>
          <DatePicker value={end_date} onChange={setEndDate} />
          <button className="apply" type="submit">
            apply
          </button>
        </form>
        <p className="upcoming-leaves-header">Upcoming Leaves</p>
        <table className="upcoming-leaves-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start-date</th>
              <th>End-date</th>
              <th>Reason</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {!isloading && upcomingLeaves
              ? upcomingLeaves.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{localStorage.getItem("username")}</td>
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.reason ? item.reason : "NA"}</td>
                      <td>
                        <Link
                          className="edit-leave"
                          to={"/editleave"}
                          state={{
                            id: item.id,
                            start_date: item.start_date,
                            end_date: item.end_date,
                            reason: item.reason,
                          }}
                        >
                          <i className="zmdi zmdi-edit"></i>
                        </Link>
                        <span
                          className="delete-leave"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="zmdi zmdi-delete"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })
              : "NULL"}
          </tbody>
        </table>
        <p className="past-leaves-header">Past Leaves</p>
        <table className="past-leaves-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start-date</th>
              <th>End-date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {!isloading && pastLeaves
              ? pastLeaves.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{localStorage.getItem("username")}</td>
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.reason ? item.reason : "NA"}</td>
                    </tr>
                  );
                })
              : "NULL"}
          </tbody>
        </table>
      </div>
    </>
  );
}
