import React from "react";
import "../../StyleSheet/Subheading.css";

const Subheading = ({ quiz }) => {
  return (
    <div className="quiz-subheading">
      <div className="quiz-title-section">
        <h1>{quiz.title}</h1>

        <span className="quiz-topic">{quiz.topic}</span>
      </div>

      <div className="quiz-meta">
        <div className="meta-item">
          <span className="meta-label">Author</span>
          <span className="meta-value">{quiz.authorName}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">Marks</span>
          <span className="meta-value">{quiz.totalMarks}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">Questions</span>
          <span className="meta-value">{quiz.totalQuestions}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">Duration</span>
          <span className="meta-value">
            {Math.round(
              (quiz.endTime.toMillis() - quiz.startTime.toMillis()) / 60000
            )}{" "}
            mins
          </span>
        </div>
      </div>
    </div>
  );
};

export default Subheading;
