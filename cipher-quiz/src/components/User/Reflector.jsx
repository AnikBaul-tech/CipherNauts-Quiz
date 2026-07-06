import React from "react";
import "../../StyleSheet/Reflector.css";

const Reflector = ({ totalQs, attempted = [], timeLeft }) => {
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="reflector">

      <div className="options">
        {Array.from({ length: totalQs }).map((_, i) => (
          <div
            key={i}
            className={`q-box ${
              attempted[i] ? "attempted" : "not-attempted"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Reflector;