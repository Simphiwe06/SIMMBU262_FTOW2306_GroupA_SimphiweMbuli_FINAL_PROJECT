// src/views/Preview/Preview.jsx
import React, { useState, useEffect } from "react";
import GenreList from "./GenreList";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";
import ShowDetails from "./ShowDetails";

const Preview = ({ showsData }) => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [sortedShows, setSortedShows] = useState(showsData);

  useEffect(() => {
    // This effect will run whenever showsData changes
    setSortedShows([...showsData]);
  }, [showsData]);

  const handleShowClick = (show) => {
    setSelectedShow(show);
  };

  const handleSortChange = (sortOption) => {
    let sortedShowsCopy = [...sortedShows];

    if (sortOption === "title-asc") {
      sortedShowsCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      sortedShowsCopy.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "date-asc") {
      sortedShowsCopy.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (sortOption === "date-desc") {
      sortedShowsCopy.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    setSortedShows(sortedShowsCopy);
  };

  return (
    <div className="preview">
      <>
        {/* Include GenreList, SearchBar, and SortByDropdown components here */}
        <GenreList />
        <SearchBar />
        <SortBy onSortChange={handleSortChange} />
      </>
      {selectedShow ? (
        <ShowDetails show={selectedShow} />
      ) : (
        // Map over the sortedShows array to render individual show previews
        <div className="show-grid">
          {sortedShows.map((show) => (
            <div
              key={show.id}
              className="show-preview"
              onClick={() => handleShowClick(show)}
            >
              <img src={show.image} alt={show.title} />
              <h3>{show.title}</h3>
              <p>Genre: {show.genres.join(", ")}</p>
              <p>
                Last Updated: {new Date(show.updated).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Preview;
