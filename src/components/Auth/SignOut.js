import React, { useEffect } from "react";
import { clearCookie } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SignOut() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://dkgicggupnrxldwvkeft.supabase.co/auth/v1/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }).then((res) => {
      clearCookie();
      navigate("/");
    });
  });

  return <div>SignOut</div>;
}
