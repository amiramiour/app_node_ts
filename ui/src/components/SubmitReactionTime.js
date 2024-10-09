// src/components/SubmitReactionTime.js
import React, { useState, useRef } from 'react';
import axios from 'axios';

const SubmitReactionTime = ({ token }) => {
  const [message, setMessage] = useState('Click "Start" to begin');
  const [showStopButton, setShowStopButton] = useState(false);
  const [reactionTime, setReactionTime] = useState(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const handleStart = () => {
    setMessage('Wait for "Stop" button to appear...');
    setShowStopButton(false);
    setReactionTime(0);
    const delay = Math.floor(Math.random() * 3000) + 2000; // Delay between 2s and 5s

    timerRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setMessage('Click "Stop" now!');
      setShowStopButton(true);
    }, delay);
  };

  const handleStop = async () => {
    if (startTimeRef.current) {
      const reactionTime = Date.now() - startTimeRef.current;
      setReactionTime(reactionTime);
      setMessage(`Your reaction time is ${reactionTime} ms`);

      try {
        await axios.post('http://localhost:3000/api/reaction-time/submit-reaction-time', { time: reactionTime }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Reaction time submitted successfully');
      } catch (error) {
        console.error('Error submitting reaction time', error);
      }

      startTimeRef.current = null;
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div>
      <p>{message}</p>
      <div className="button-container">
        <button className="start" onClick={handleStart}>Start</button>
        {showStopButton && <button className="stop" onClick={handleStop}>Stop</button>}
      </div>
      <div className="reaction-tube">
        <div className="reaction-tube-fill" style={{ width: `${reactionTime / 10}%` }}></div>
      </div>
    </div>
  );
};

export default SubmitReactionTime;