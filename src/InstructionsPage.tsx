import React from 'react';

const InstructionsPage = () => {
  return (
    <div>
      <h2>Instructions</h2>
      <ol>
        <li>Open the app, and you'll land on the Home Screen.</li>
        <li>Click on the "Start" button to proceed to the next step.</li>
        <li>Number of Players Entry Screen:
          <ul>
            <li>On the "Number of Players Entry" screen, you can enter the number of players on your team.</li>
            <li>Fill in the "Number of Players" field with the desired number.</li>
            <li>Click the "Next" button to continue.</li>
          </ul>
        </li>
        {/* Add more instructions here */}
      </ol>
    </div>
  );
};

export default InstructionsPage;
