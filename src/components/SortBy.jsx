// src/views/Preview/SortBy.jsx
import React from "react";

const SortBy = ({ onSortChange }) => {
  return (
    <div className="sort-by">
      <button onClick={() => onSortChange("title-asc")}>A-Z</button>
      <button onClick={() => onSortChange("title-desc")}>Z-A</button>
      <button onClick={() => onSortChange("date-asc")}>Least Recent</button>
      <button onClick={() => onSortChange("date-desc")}>Most Recent</button>
    </div>
  );
};

export default SortBy;
