import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import { fetchData } from './api'; // Import the fetchData function

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <div>
      <h2>Fetched Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <Typography>{item.userName}</Typography>
            {/* Add other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;
