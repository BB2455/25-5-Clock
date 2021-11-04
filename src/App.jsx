import "./styles/styles.css";

function App() {
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
              <button id="break-decrement">-</button>{" "}
              <h4 id="break-length">5</h4>
              <button id="break-increment">+</button>
            </div>
          </div>
          <div className="clocks-buttons-inner-container">
            <h2 id="session-label">Session Length</h2>
            <div className="buttons-container">
              <button id="session-decrement">-</button>{" "}
              <h4 id="session-length">25</h4>
              <button id="session-increment">+</button>
            </div>
          </div>
        </div>
        <div className="timer-container">
          <h1 id="timer-label">Session</h1>
          <h1 id="time-left">25:00</h1>
        </div>
        <div className="timer-buttons-container">
          <button id="start_stop">Start</button>
          <button id="reset">Reset</button>
        </div>
      </section>
    </>
  );
}

export default App;
