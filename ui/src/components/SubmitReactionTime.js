// src/components/SubmitReactionTime.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitReactionTime = ({ token }) => {
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/reaction-time/submit-reaction-time', { time }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Reaction time submitted successfully');
    } catch (error) {
      console.error('Error submitting reaction time', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Reaction Time (ms)" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitReactionTime;