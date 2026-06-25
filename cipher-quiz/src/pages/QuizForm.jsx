import React, { useState } from "react";
import QuestionCard from "../components/User/QuestionCard";
import Subheading from "../components/User/Subheading";
import "../APP.css";
import Reflector from "../components/User/Reflector";

const QuizForm = () => {
  const [answers,setAnswers] = useState({});

  const handleAnswers = (questionId,ans) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId] : ans
    }))
  }

  const handleSubmit = () => {
    console.log(answers)
  }
  
  const questionSet = [
    {
      id: 1,
      question: "1+1",
      type: "mcq",
      options: [1, 2, 3, 4],
    },
    {
      id: 2,
      question: "1+2",
      type: "mcq",
      options: [1, 2, 3, 4],
    },
    {
      id: 3,
      question: "1+2",
      type: "text",
    },
  ];
  return (
    <>
      <h1 className="main-heading">Cipher Quiz</h1>
      <Subheading desc="Basic Quiz" author="HA" tmarks="50" ttime="60 mins" />

      <div className="main-container">
        <div className="qs-form-container">
          {questionSet.map((qs) => (
            <QuestionCard
              key={qs.id}
              questionId = {qs.id}
              type={qs.type}
              question={qs.question}
              options={qs.options}
              onSelect={(questionid,ans) => handleAnswers(questionid,ans)}
            />
          ))}
        </div>
        <div className="side-show">
          <Reflector
            totalQs={40}
            attempted={[true,true,false,false,false,false,false,true,true,true,true,false,true,false,true]}
            timeLeft={150}
          />
        </div>
      </div>
      <button onClick={handleSubmit()}>Ans</button>
    </>
  );
};

export default QuizForm;