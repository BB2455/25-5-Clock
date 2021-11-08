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
  const [sessionTime, setSessionTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isSession, setIsSession] = useState(true);
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time, type) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (type === "min") {
      return minutes;
    }
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const updateSessionTime = (amount, type) => {
    let newTime;
    switch (type) {
      case "increment":
        if (sessionTime + amount > 60 * 60) {
          return;
        }
        newTime = sessionTime + amount;
        break;
      case "decrement":
        if (sessionTime - amount < 60) {
          return;
        }
        newTime = sessionTime - amount;
        break;
      default:
        break;
    }
    if (!isRunning) {
      setTimer(newTime);
    }
    setSessionTime(newTime);
  };

  const updateBreakTime = (amount, type) => {
    switch (type) {
      case "increment":
        if (breakTime + amount > 60 * 60) {
          return;
        }
        setBreakTime(breakTime + amount);
        break;
      case "decrement":
        if (breakTime - amount < 60) {
          return;
        }
        setBreakTime(breakTime - amount);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setIsRunning(false);
    setSessionTime(1500);
    setBreakTime(300);
    setTimer(1500);
    setIsSession(true);
  };

  const playStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      <audio id="beep"></audio>
      <header>
        <h1>25 + 5 Clock</h1>
      </header>
      <section className="clock-container">
        <div className="clock-buttons-container">
          <div className="clocks-buttons-inner-container">
            <h2 id="break-label">Break Length</h2>
            <div className="buttons-container">
              <button
                id="break-decrement"
                onClick={() => updateBreakTime(60, "decrement")}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>{" "}
              <h2 id="break-length">{formatTime(breakTime, "min")}</h2>
              <button
                id="break-increment"
                onClick={() => updateBreakTime(60, "increment")}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
          <div className="clocks-buttons-inner-container">
            <h2 id="session-label">Session Length</h2>
            <div className="buttons-container">
              <button
                id="session-decrement"
                onClick={() => updateSessionTime(60, "decrement")}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>{" "}
              <h2 id="session-length">{formatTime(sessionTime, "min")}</h2>
              <button
                id="session-increment"
                onClick={() => updateSessionTime(60, "increment")}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
        </div>
        <div className="timer-container">
          <h1 id="timer-label">{isSession ? "Session" : "Break"}</h1>
          <h1 id="time-left">{formatTime(timer)}</h1>
        </div>
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
      </section>
    </>
  );
}

export default App;
