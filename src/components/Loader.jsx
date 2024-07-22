import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="cube">
        <div className="cube__inner"></div>
      </div>
      <div className="cube">
        <div className="cube__inner"></div>
      </div>
      <div className="cube">
        <div className="cube__inner"></div>
      </div>
    </div>
  );
}
