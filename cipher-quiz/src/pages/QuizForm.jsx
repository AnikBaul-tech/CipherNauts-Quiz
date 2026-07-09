import React from "react";
import QuestionCard from "../components/User/QuestionCard";
import "../StyleSheet/QuizForm.css";

const QuizForm = ({
  questions,
  setAttempted,
  onSubmit,
  answers,
  setAnswers,
  disabled,
  submitted
}) => {
  const handleAnswer = (index, questionId, answer) => {
    setAnswers((prev) => {
      const updated = { ...prev };
  
      if (answer === null) {
        delete updated[questionId];
      } else {
        updated[questionId] = answer;
      }
  
      return updated;
    });
  
    setAttempted((prev) => {
      const updated = [...prev];
  
      updated[index] = answer !== null;
  
      return updated;
    });
  };
 

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>
      {disabled && <div className="quiz-form-container">Quiz Ended</div>}

      {!disabled && (
        <div className="quiz-form-container">
          {questions.map((qs, index) => (
            <QuestionCard
              key={qs.id}
              index={index}
              questionId={qs.id}
              type={qs.type}
              question={qs.question}
              options={qs.options}
              answer={answers[qs.id]}
              disabled={disabled || submitted}
              onSelect={(answer) =>
                handleAnswer(
                  index,

                  qs.id,

                  answer
                )
              }
            />
          ))}

          <div className="submit-container">
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={disabled || submitted}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizForm;
