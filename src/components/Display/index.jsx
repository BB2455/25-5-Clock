import React from "react";
import { formatTime } from "../../utils";

const Display = ({ timer, isSession }) => {
  return (
    <div className="timer-container">
      <h1 id="timer-label">{isSession ? "Session" : "Break"}</h1>
      <h1 id="time-left">{formatTime(timer)}</h1>
    </div>
  );
};

export default Display;
