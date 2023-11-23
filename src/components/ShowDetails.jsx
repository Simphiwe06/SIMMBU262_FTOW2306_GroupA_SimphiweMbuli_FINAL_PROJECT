// src/views/Preview/ShowDetails.jsx
import React, { useState } from "react";

const ShowDetails = ({ show }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  return (
    <div className="show-details-container">
      <h2>{show.title}</h2>
      <p>Description: {show.description}</p>
      <p>Seasons: {show.seasons}</p>
      <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
      <p>Genres: {show.genres.join(", ")}</p>
      <img src={show.image} alt={show.title} className="show-image" />

      {/* Display seasons and episodes if available */}
      {show.seasons && show.seasons.length > 0 && (
        <div className="seasons">
          {show.seasons.map((season, index) => (
            <div
              key={index}
              className="season-preview"
              onClick={() => handleSeasonClick(index + 1)}
            >
              <h3>Season {index + 1}</h3>
              <p>Description: {season.description}</p>
              <p>Episodes: {season.episodes.length}</p>
              <p>Release Date: {new Date(season.releaseDate).toLocaleDateString()}</p>
              {/* more details about the season  */}
            </div>
          ))}
        </div>
      )}

      {/* Display episodes for the selected season */}
      {selectedSeason !== null && (
        <div className="episodes">
          <h3>Episodes - Season {selectedSeason}</h3>
          {show.seasons[selectedSeason - 1].episodes.map((episode, index) => (
            <div key={index} className="episode-preview">
              <h4>{episode.title}</h4>
              <p>Description: {episode.description}</p>
              <p>Release Date: {new Date(episode.releaseDate).toLocaleDateString()}</p>
              {/*  more details about the episode  */}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ShowDetails;
