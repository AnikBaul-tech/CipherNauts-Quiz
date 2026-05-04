import React, { useState } from "react";
import QuestionCard from "./components/User/QuestionCard";
import Subheading from "./components/User/Subheading";
import "./App.css";
import QuestionForm from "./components/Creator/QuestionForm";
import Reflector from "./components/User/Reflector";

const App = () => {
  const [questions, setQuestions] = useState([]);

  const handleSave = (q) => {
    setQuestions([...questions, q]);
  };
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
      id: 2,
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
              type={qs.type}
              question={qs.question}
              options={qs.options}
              onSelect={(ans) => console.log("Selected:", ans)}
            />
          ))}
          <QuestionForm onSave={handleSave} />
        </div>
        <div className="side-show">
          <Reflector
            totalQs={40}
            attempted={[true,true,false,false,false,false,false,true,true,true,true,false,true,false,true]}
            timeLeft={150}
          />
        </div>
      </div>
    </>
  );
};

export default App;
