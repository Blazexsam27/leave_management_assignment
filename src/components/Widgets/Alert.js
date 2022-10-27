import React from "react";
import "../styles/Widgets/Alert.css";

export default function Alert(props) {
  const { text, dismiss } = props;
  return (
    <div className="alert-container">
      <p className="alert-text">{text}</p>
      <span onClick={dismiss}>
        <i className="zmdi zmdi-close"></i>
      </span>
    </div>
  );
}
