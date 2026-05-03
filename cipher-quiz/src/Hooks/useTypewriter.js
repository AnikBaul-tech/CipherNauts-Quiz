import { useEffect, useState } from "react";

export const useTypewriter = (text, speed = 80, delay = 0) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    let timeout;
    setDisplayText("");

    const startTyping = () => {
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);

      return () => clearInterval(interval);
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return displayText;
};
