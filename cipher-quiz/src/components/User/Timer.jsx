import React, { useEffect, useRef, useState } from "react";
import "../../StyleSheet/Timer.css";

const Timer = ({ endTime, warningTime = 60, pause, onTimeUp, onTick }) => {
  const calculateRemaining = () => {
    if (!endTime) return 0;

    const end =
      typeof endTime.toMillis === "function"
        ? endTime.toMillis()
        : new Date(endTime).getTime();

    return Math.max(0, Math.floor((end - Date.now()) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemaining());

  const timerRef = useRef(null);

  const finishedRef = useRef(false);

  useEffect(() => {
    if (pause) return;
    if (!endTime) return;

    const remaining = calculateRemaining();

    setTimeLeft(remaining);

    onTick?.(remaining);

    timerRef.current = setInterval(() => {
      const remaining = calculateRemaining();

      setTimeLeft(remaining);

      if (onTick) {
        onTick(remaining);
      }

      if (remaining <= 0) {
        clearInterval(timerRef.current);

        if (!finishedRef.current) {
          finishedRef.current = true;

          onTimeUp?.();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [pause, endTime, onTimeUp, onTick]);

  useEffect(() => {
    finishedRef.current = false;
  }, [endTime]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");

  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={`timer ${timeLeft <= warningTime ? "warning" : ""}`}>
      {minutes}:{seconds}
    </div>
  );
};

export default Timer;
