const Cookies = require("js-cookie");

const url =
  "https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?start_date=gt.";

const getMonthName = (number) => {
  const date = new Date();
  date.setMonth(number);
  return date.toLocaleString([], {
    month: "long",
  });
};
const getLastDayCurrentMonth = () => {
  var date = new Date();
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDay.getDate();
};
const parseDate = (date) => {
  const temp = date.toLocaleDateString().split("/");
  const parsedDate = `${temp[2]}-${temp[1]}-${temp[0]}`;
  return parsedDate;
};

// Function to retrieve leaves.
const getCurrentMonthUpcomingLeaves = async (start_date, end_date) => {
  const data = await fetch(
    url + `${start_date}&end_date=lt.${end_date}&select=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
  return await data.json();
};

const getCurrentMonthPastLeaves = async (start_date, end_date) => {
  const data = await fetch(
    url + `${start_date}&end_date=lt.${end_date}&select=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
  return await data.json();
};

const getLeavesInRange = async (start_date, end_date) => {
  const data = await fetch(
    url + `${start_date}&end_date=lt.${end_date}&select=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
  return await data.json();
};

// functions for filtering leaves
const getPastMonthLeaves = async () => {
  const date = new Date();
  const leaves = await getLeavesInRange(
    `${date.getFullYear()}-${date.getMonth() + 1}-${1}`,
    `${date.getFullYear()}-${date.getMonth() + 1}-${getLastDayCurrentMonth()}`
  );
  return leaves;
};

const getCurrentMonthLeaves = async () => {
  const date = new Date();
  const upcomingLeaves = await getCurrentMonthUpcomingLeaves(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    `${date.getFullYear()}-${date.getMonth() + 1}-${getLastDayCurrentMonth()}`
  );
  const pastLeaves = await getCurrentMonthPastLeaves(
    `${date.getFullYear()}-${date.getMonth() + 1}-${1}`,
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
  return { upcomingLeaves, pastLeaves };
};

const getPast6MonthsLeaves = async () => {
  const date = new Date();
  const leaves = await getLeavesInRange(
    `${date.getFullYear()}-${date.getMonth() - 5}-${date.getDate()}`,
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
  return leaves;
};

const getPast1YearLeaves = async () => {
  const date = new Date();
  const leaves = await getLeavesInRange(
    `${date.getFullYear() - 1}-${date.getMonth() + 1}-${date.getDate()}`,
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
  return leaves;
};

// funtion to delete a leave using id.
const deleteLeave = async (leave_id) => {
  await fetch(
    `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?id=eq.${leave_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }
  );
};

module.exports = {
  parseDate,
  getLeavesInRange,
  deleteLeave,
  getMonthName,
  getCurrentMonthUpcomingLeaves,
  getCurrentMonthPastLeaves,
  getPastMonthLeaves,
  getCurrentMonthLeaves,
  getPast6MonthsLeaves,
  getPast1YearLeaves,
};
