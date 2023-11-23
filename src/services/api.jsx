// src/services/api.js
const BASE_URL = "https://podcast-api.netlify.app";

export const getShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw error;
  }
};
