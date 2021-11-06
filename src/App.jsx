import React, { useState } from "react";
import "./styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isPlaying, setPlaying] = useState(false);

  const playStop = () => {
    setPlaying(!isPlaying);
  };

  return (
    <>
      <header>
        <h1>25 + 5 Clock</h1>
      </header>
      <section className="clock-container">
        <div className="clock-buttons-container">
          <div className="clocks-buttons-inner-container">
            <h2 id="break-label">Break Length</h2>
            <div className="buttons-container">
              <button id="break-decrement">
                <FontAwesomeIcon icon={faArrowDown} />
              </button>{" "}
              <h2 id="break-length">5</h2>
              <button id="break-increment">
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
          <div className="clocks-buttons-inner-container">
            <h2 id="session-label">Session Length</h2>
            <div className="buttons-container">
              <button id="session-decrement">
                <FontAwesomeIcon icon={faArrowDown} />
              </button>{" "}
              <h2 id="session-length">25</h2>
              <button id="session-increment">
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
        </div>
        <div className="timer-container">
          <h1 id="timer-label">Session</h1>
          <h1 id="time-left">25:00</h1>
        </div>
        <div className="timer-buttons-container">
          <button id="start_stop" onClick={playStop}>
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button id="reset">
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
