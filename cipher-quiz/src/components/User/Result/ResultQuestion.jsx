import React from "react";

const ResultQuestion = ({ response, index }) => {
  return (
    <div className="result-question-card">
      <h2>Question {index + 1}</h2>

      <p className="question">{response.question}</p>

      {response.isCorrect ? (
        <div className="correct-answer">
          ✓ Your Answer :{response.selectedAnswer}
        </div>
      ) : (
        <>
          <div className="wrong-answer">
            ✗ Your Answer :{response.selectedAnswer || "Not Answered"}
          </div>

          <div className="correct-answer">
            ✓ Correct Answer :{response.correctAnswer}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultQuestion;
