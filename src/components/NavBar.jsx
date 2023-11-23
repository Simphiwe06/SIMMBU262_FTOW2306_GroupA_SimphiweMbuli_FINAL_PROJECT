import React from "react";

export default function NavBar() {
  return (
    <nav>
      <img src="./src/images/podplug-logo.png" className="nav--logo" />
      <h1 className="app-name">PodPlug</h1>
      
      <div className="nav-options">
        <span className="nav-option">Home</span>
        <span className="nav-option">Explore</span>
        <span className="nav-option">Favorites</span>
      </div>

    </nav>
  );
}

