import React, { useEffect, useState } from "react";
import "../styles/Leaves/Listing.css";
import {
  getPastLeaves,
  getUpcomingLeaves,
} from "../../services/leavesServices";

export default function Listing() {
  const [pastLeaves, setPastLeaves] = useState([]);
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const getLeaves = async () => {
    setPastLeaves(await getPastLeaves());
    setUpcomingLeaves(await getUpcomingLeaves());
    setIsloading(false);
  };

  useEffect(() => {
    getLeaves();
  }, []);

  return (
    <div className="listing-container">
      <p className="upcoming-leaves-header">Upcoming Leaves</p>
      <table className="upcoming-leaves-table">
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
            ? upcomingLeaves.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>NAME</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.reason}</td>
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
                    <td>NAME</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.reason}</td>
                  </tr>
                );
              })
            : "NULL"}
        </tbody>
      </table>
    </div>
  );
}
