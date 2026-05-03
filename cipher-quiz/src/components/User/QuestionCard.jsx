import React, { useState } from "react";
import "../../StyleSheet/Questions.css"

const QuestionCard = ({ question, points = 1, options, type, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
    if (onSelect) onSelect(option);
  };

  const handleWrite = (e) => {
    setWrittenAnswer(e.target.value);
    if (onSelect) onSelect(e.target.value);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-text">{question}</div>
        <div className="question-points">{points} pts</div>
      </div>
      <div className="question-options">
        {type === "mcq" ? (
          options.map((opt, index) => (
            <div
              key={index}
              className={`option ${selected === opt ? "selected" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))
        ) : (
          <textarea
            className="answer-input"
            placeholder="Write your answer here..."
            value={writtenAnswer}
            onChange={handleWrite}
          />
        )}
      </div>

    </div>
  );
};

export default QuestionCard;
