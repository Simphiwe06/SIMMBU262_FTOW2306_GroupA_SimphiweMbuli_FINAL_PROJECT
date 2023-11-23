// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import Preview from "./Preview";
import { getShows } from "../services/api";

const HomePage = () => {
  const [showsData, setShowsData] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        setShowsData(data);
      } catch (error) {
        // Handle error as needed
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h1>Welcome to your PodPlug!</h1>
      <Preview showsData={showsData} />
    </div>
  );
};

export default HomePage;
