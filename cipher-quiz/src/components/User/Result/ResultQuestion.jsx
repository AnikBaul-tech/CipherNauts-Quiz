import React from "react";

const ResultQuestion = ({ response, index }) => {
  return (
    <div className="result-question-card">
      <div className="result-question-header">
        <div>
          <h2>Question {index + 1}</h2>
          <p className="question">{response.question}</p>
        </div>

        <div
          className={`question-score ${
            response.isCorrect ? "score-correct" : "score-wrong"
          }`}
        >
          {response.obtainedMarks} / {response.points}
        </div>
      </div>

      {response.type === "mcq" ? (
        <div className="result-options">
          {response.options.map((option, index) => {
            let className = "result-option";

            if (option === response.correctAnswer)
              className += " correct-option";

            if (
              option === response.selectedAnswer &&
              option !== response.correctAnswer
            )
              className += " wrong-option";

            return (
              <div key={index} className={className}>
                <span>{option}</span>

                {option === response.correctAnswer && (
                  <span className="badge correct">Correct</span>
                )}

                {option === response.selectedAnswer &&
                  option !== response.correctAnswer && (
                    <span className="badge wrong">Your Answer</span>
                  )}

                {option === response.selectedAnswer &&
                  option === response.correctAnswer && (
                    <span className="badge correct">Your Answer ✓</span>
                  )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="subjective-result">
          <div className="answer-box">
            <h4>Your Answer</h4>
            <p>{response.selectedAnswer || "Not Answered"}</p>
          </div>

          {!response.isCorrect && (
            <div className="answer-box correct-box">
              <h4>Correct Answer</h4>
              <p>{response.correctAnswer}</p>
              <p></p>
            </div>
          )}
        </div>
      )}

      {response.hint && (
        <div className="hint-box">
          <h4>💡 Hint / Explanation</h4>
          <p>{response.hint}</p>
        </div>
      )}
    </div>
  );
};

export default ResultQuestion;
