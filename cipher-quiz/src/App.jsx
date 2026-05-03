import React, { useState } from "react";
import QuestionCard from "./components/User/QuestionCard";
import Subheading from "./components/User/Subheading";
import "./App.css";
import QuestionForm from "./components/Creator/QuestionForm";

const App = () => {
  const [questions, setQuestions] = useState([]);

  const handleSave = (q) => {
    setQuestions([...questions, q]);
  };
  return (
    <>
      <h1 className="main-heading">Cipher Quiz</h1>
      <Subheading desc="Basic Quiz" author="HA" tmarks="50" ttime="60 mins" />
      <QuestionCard
        question="1+1= .?"
        options={["1", "2", "3", "4"]}
        onSelect={(ans) => console.log("Selected:", ans)}
        type="mcq"
      />
      <QuestionForm onSave={handleSave} />
    </>
  );
};

export default App;
