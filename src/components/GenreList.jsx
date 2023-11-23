// src/views/Preview/GenreList.jsx
import React from "react";

const GenreList = () => {
  const genreTitles = [
    "Personal Growth",
    "True Crime and Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];

  return (
    <div className="genre-list">
      <ul>
        {genreTitles.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
