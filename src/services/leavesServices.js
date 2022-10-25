const date = new Date();

const getPastLeaves = async () => {
  const start_date = `${date.getFullYear() - 1}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const end_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const data = await fetch(
    `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?start_date=gt.${start_date}&end_date=lt.${end_date}&select=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  return await data.json();
};

const getUpcomingLeaves = async () => {
  const start_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const end_date = `${date.getFullYear() + 1}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const data = await fetch(
    `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?start_date=gt.${start_date}&end_date=lt.${end_date}&select=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  return await data.json();
};

module.exports = { getPastLeaves, getUpcomingLeaves };
