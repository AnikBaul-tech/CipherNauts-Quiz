import React from "react";
import "../../StyleSheet/Reflector.css";

const Reflector = ({ totalQs, attempted = [] }) => {
  return (
    <div className="reflector">
      <div className="options">
        {Array.from({ length: totalQs }).map((_, i) => (
          <div
            key={i}
            className={`q-box ${attempted[i] ? "attempted" : "not-attempted"}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="reflector-legend">
        <div className="legend-item">
          <span className="legend attempted"></span>
          Attempted
        </div>

        <div className="legend-item">
          <span className="legend pending"></span>
          Remaining
        </div>
      </div>
    </div>
  );
};

export default Reflector;
