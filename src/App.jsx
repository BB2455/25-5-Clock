import React, { useState, useRef, useEffect } from "react";
import "./styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import alarmSound from "./assets/Alarm.mp3";

function App() {
  const [sessionTime, setSessionTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isSession, setIsSession] = useState(true);
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalID, setIntervalID] = useState(0);
  const Alarm = useRef(null);

  const playAlarm = () => {
    Alarm.current.play();
  };

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
    if (isRunning) return;
    if (type === "increment") {
      if (sessionTime + amount > 60 * 60) {
        return;
      }
      setSessionTime(sessionTime + amount);
    } else if (type === "decrement") {
      if (sessionTime - amount < 60) {
        return;
      }
      setSessionTime(sessionTime - amount);
    }
  };

  const updateBreakTime = (amount, type) => {
    if (isRunning) return;
    if (type === "increment") {
      if (breakTime + amount > 60 * 60) {
        return;
      }
      setBreakTime(breakTime + amount);
    } else if (type === "decrement") {
      if (breakTime - amount < 60) {
        return;
      }
      setBreakTime(breakTime - amount);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setSessionTime(1500);
    setBreakTime(300);
    setTimer(1500);
    setIsSession(true);
    Alarm.current.pause();
    Alarm.current.currentTime = 0;
    if (intervalID !== 0) {
      clearInterval(intervalID);
      setIntervalID(0);
    }
  };

  const playStop = () => {
    if (!intervalID) {
      setIntervalID(
        setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000)
      );
      setIsRunning(true);
    } else {
      clearInterval(intervalID);
      setIntervalID(0);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    setTimer(sessionTime);
  }, [sessionTime]);

  useEffect(() => {
    if (timer === 0) {
      playAlarm();
      if (isSession) {
        setTimer(breakTime);
        setIsSession(false);
      } else {
        setTimer(sessionTime);
        setIsSession(true);
      }
    }
  }, [timer, isSession, breakTime, sessionTime]);

  return (
    <>
      <audio ref={Alarm} src={alarmSound} preload="auto" id="beep"></audio>
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
