import React from "react";
import { useTypewriter } from "../../Hooks/useTypewriter.js";
import "../../StyleSheet/Subheading.css";

const Subheading = ({ quiz }) => {
  const line1 = useTypewriter(`Title: ${quiz.title}`);
  const line2 = useTypewriter(` Author: ${quiz.authorName}`);
  const line3 = useTypewriter(` Topic: ${quiz.topic} | Marks: ${quiz.totalMarks}`);
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
