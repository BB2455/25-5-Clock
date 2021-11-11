import React from "react";
import { capitalize, formatTime } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TimeButtons = ({ type, increment, decrement, time }) => {
  return (
    <div className="clocks-buttons-inner-container">
      <h2 id={`${type}-label`}>{capitalize(type)} Length</h2>
      <div className="buttons-container">
        <button
          id={`${type}-decrement`}
          onClick={() => decrement(60, "decrement")}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>{" "}
        <h2 id={`${type}-length`}>{formatTime(time, "min")}</h2>
        <button
          id={`${type}-increment`}
          onClick={() => increment(60, "increment")}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default TimeButtons;
