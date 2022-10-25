import React, { useEffect, useState } from "react";
import "../styles/Leaves/Listing.css";
import {
  deleteLeave,
  getPastLeaves,
  getUpcomingLeaves,
} from "../../services/leavesServices";
import Navbar from "../Widgets/Navbar";
import { Link } from "react-router-dom";

export default function Listing() {
  const [pastLeaves, setPastLeaves] = useState([]);
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const getLeaves = async () => {
    setPastLeaves(await getPastLeaves());
    setUpcomingLeaves(await getUpcomingLeaves());
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
            {!isloading
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
                          state={{ id: item.id }}
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
            {!isloading
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
