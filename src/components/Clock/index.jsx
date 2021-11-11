import React, { useState, useEffect, useRef } from "react";
import alarmSound from "../../assets/Alarm.mp3";
import TimeButtons from "../TimeButtons";
import Display from "../Display";
import TimerControls from "../TimerControls";

const Clock = () => {
  const [sessionTime, setSessionTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isSession, setIsSession] = useState(true);
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalID, setIntervalID] = useState(0);
  const Alarm = useRef(null);

  // Takes amount to be updated in seconds, time is the current amount in the times length (breakTime, sessionTime)
  // operation takes "increment", "decrement" to add or subtract from time.
  // fn is the function (setBreakTime, setSessionTime) to update state of the (breakTime, sessionTime)
  const updateTimeLength = (amount, time, operation, fn) => {
    if (isRunning) return;
    if (operation === "increment") {
      if (time + amount > 60 * 60) return;
      fn(time + amount);
    } else if (operation === "decrement") {
      if (time - amount < 60) return;
      fn(time - amount);
    }
  };

  // Resets state to defaults
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

  // Checks if there is an intervalID and will create a new setInterval set to intervalID if there is none,
  // and clears the interval if there is one. Will update isRunning state.
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

  // Everytime the sessionTime is updated will update the Timer to match.
  useEffect(() => {
    setTimer(sessionTime);
  }, [sessionTime]);

  // Once a setInterval starts will update timer until it reaches its target.
  // Will change timer based on isSession is true or false once reaching 0.
  useEffect(() => {
    if (timer === 0) {
      // Plays Alarm Sound
      Alarm.current.play();
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
    <section className="clock-container">
      <audio ref={Alarm} src={alarmSound} preload="auto" id="beep"></audio>
      <div className="clock-buttons-container">
        <TimeButtons
          type="break"
          increment={() =>
            updateTimeLength(60, breakTime, "increment", setBreakTime)
          }
          decrement={() =>
            updateTimeLength(60, breakTime, "decrement", setBreakTime)
          }
          time={breakTime}
        />
        <TimeButtons
          type="session"
          increment={() =>
            updateTimeLength(60, sessionTime, "increment", setSessionTime)
          }
          decrement={() =>
            updateTimeLength(60, sessionTime, "decrement", setSessionTime)
          }
          time={sessionTime}
        />
      </div>
      <Display timer={timer} isSession={isSession} />
      <TimerControls playStop={playStop} reset={reset} isRunning={isRunning} />
    </section>
  );
};

export default Clock;
