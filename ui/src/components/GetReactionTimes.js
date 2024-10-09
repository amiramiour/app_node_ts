// src/components/GetReactionTimes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetReactionTimes = ({ token }) => {
  const [reactionTimes, setReactionTimes] = useState([]);

  useEffect(() => {
    const fetchReactionTimes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reaction-time/get-reaction-times', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReactionTimes(response.data);
      } catch (error) {
        console.error('Error retrieving reaction times', error);
      }
    };

    fetchReactionTimes();
  }, [token]);

  return (
    <div>
      <h2>Reaction Times</h2>
      <ul>
        {reactionTimes.map((rt) => (
          <li key={rt._id}>{rt.time} ms</li>
        ))}
      </ul>
    </div>
  );
};

export default GetReactionTimes;