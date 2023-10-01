import React from 'react';

const HomeScreen = ({ onStart }) => {
  return (
    <div>
      <h2>Welcome to Ezy Subs</h2>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default HomeScreen;