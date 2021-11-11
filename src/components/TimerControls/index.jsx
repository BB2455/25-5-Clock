import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";

const TimerControls = ({ isRunning, playStop, reset }) => {
  return (
    <div className="timer-buttons-container">
      <button id="start_stop" onClick={playStop}>
        {isRunning ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <button id="reset" onClick={() => reset()}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export default TimerControls;
