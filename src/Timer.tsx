import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ minutes, onStart, onStop }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let countdown;

    if (timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000); // Update every second
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timeLeft]);

  return (
    <div className="timer-container">
      <h2>Countdown Timer</h2>
      <div className="large-clock">{formatTime(timeLeft)}</div>
      <button onClick={onStart} disabled={timeLeft > 0}>
        Start
      </button>
      <button onClick={onStop} disabled={timeLeft === 0}>
        Stop
      </button>
    </div>
  );
};

export default Timer;


