import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import your Timer component's CSS file

const Timer = ({ minutes, onStart, substitutions }) => {
  const [time, setTime] = useState(minutes * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
    onStart();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h2>Countdown Timer</h2>
      <div className="large-clock">{formatTime(time)}</div> {/* Add the large-clock class here */}
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      {substitutions.length > 0 && (
        <div className="substitution-info">
          <h3>Substitution Information</h3>
          <ul>
            {substitutions.map((substitution, index) => (
              <li key={index}>{substitution}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Timer;






