import React from "react";
import "../../StyleSheet/Questions.css";

const QuestionCard = ({
  question,
  points = 1,
  options,
  answer,
  type,
  onSelect,
  disabled,
}) => {
  return (
    <div className="question-card-box">
      <div className="question-header">
        <div className="question-text">{question}</div>
        <div className="question-points">{points} pts</div>
      </div>
      <div className="question-options">
        {type === "mcq" ? (
          options.map((opt, index) => (
            <div
              key={index}
              className={`option ${answer === opt ? "selected" : ""} ${
                disabled ? "disabled" : ""
              }`}
              onClick={() => {
                if (disabled) return;

                if (answer === opt) {
                  onSelect(null); // unselect
                } else {
                  onSelect(opt); // select
                }
              }}
            >
              {opt}
            </div>
          ))
        ) : (
          <textarea
            className="answer-input"
            value={answer || ""}
            disabled={disabled}
            onChange={(e) => onSelect(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
