import React from "react";
import { useTypewriter } from "../../Hooks/useTypewriter.js";
import "../../StyleSheet/Subheading.css";

const Subheading = ({ desc, author, tmarks, ttime }) => {
  const line1 = useTypewriter(`Description: ${desc}`);
  const line2 = useTypewriter(` Author: ${author}`);
  const line3 = useTypewriter(` Marks: ${tmarks} | Time: ${ttime}`);
  return (
    <div className="subheading-container">
      <div className="subheading-content">
        <div className="code-line">{line1}</div>
        <div className="code-line">{line2}</div>
        <div className="code-line">{line3}</div>
      </div>
    </div>
  );
};

export default Subheading;
