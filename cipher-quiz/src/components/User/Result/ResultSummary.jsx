import React from "react";

const ResultSummary = ({ attempt, responses }) => {
  const correct = responses.filter((response) => response.isCorrect).length;

  const wrong = responses.length - correct;

  return (
    <div className="summary-card">
      <h2>Score Card</h2>

      <hr />

      <p>
        <span>Score</span>

        <span>
          {attempt.score}/{attempt.totalMarks}
        </span>
      </p>

      <p>
        <span>Percentage</span>

        <span>{attempt.percentage}%</span>
      </p>

      <p>
        <span>Correct</span>

        <span>{correct}</span>
      </p>

      <p>
        <span>Wrong</span>

        <span>{wrong}</span>
      </p>

      <p>
        <span>Date</span>

        <span>
          {attempt.submittedAt

            ?.toDate()

            .toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default ResultSummary;
