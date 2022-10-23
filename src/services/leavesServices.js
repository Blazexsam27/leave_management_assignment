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
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY2NTAwMzU4LCJzdWIiOiI1NDc4NjNmOC02ZTE2LTQ4MjYtYTMyYS1jZTUxMjBiOGQzMWUiLCJlbWFpbCI6ImJsYXplQG1haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJuYW1lIjoiYmxhemUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzZXNzaW9uX2lkIjoiYmI2OWIwZmYtYjI4YS00M2VlLWFhZjAtODM2OWI2Y2YwYzljIn0.GP3fnGDVkXDGUyS96pW4ftGuScGXnfinmnOzpqjtHxA",
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
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY2NTAwMzU4LCJzdWIiOiI1NDc4NjNmOC02ZTE2LTQ4MjYtYTMyYS1jZTUxMjBiOGQzMWUiLCJlbWFpbCI6ImJsYXplQG1haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJuYW1lIjoiYmxhemUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzZXNzaW9uX2lkIjoiYmI2OWIwZmYtYjI4YS00M2VlLWFhZjAtODM2OWI2Y2YwYzljIn0.GP3fnGDVkXDGUyS96pW4ftGuScGXnfinmnOzpqjtHxA",
      },
    }
  );
  return await data.json();
};

module.exports = { getPastLeaves, getUpcomingLeaves };
