import React, { useState } from "react";
import QuestionForm from "../components/Creator/QuestionForm";

const QuestionMakingForm = () => {
  const [questions, setQuestions] = useState([]);

  const handleSave = (q) => {
    setQuestions([...questions, q]);
  };
  return (
    <div>
        <form>
            <input type="text" placeholder="Quiz Name .."/>
            <input type="text" placeholder="Created By .."/>
            <input type="text" placeholder="Topic .."/>
            <input type="text" placeholder="Description .."/>
        </form>
      <QuestionForm onSave={handleSave} />
    </div>
  );
};

export default QuestionMakingForm;
