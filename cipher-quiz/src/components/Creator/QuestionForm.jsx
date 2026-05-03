import React, { useState } from "react";
import "../../StyleSheet/QuestionForm.css";

const QuestionForm = ({ onSave }) => {
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState(1);
  const [type, setType] = useState("mcq");
  const [options, setOptions] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const handleSubmit = () => {
    const data =
      type === "mcq"
        ? {
            question,
            points,
            type,
            options,
            correctAnswer: options[correctIndex],
          }
        : {
            question,
            points,
            type,
            correctAnswer: answer,
          };

    onSave(data);
  };

  return (
    <div className="form-card">
      <input
        className="input"
        placeholder="Enter question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="row">
        <input
          type="number"
          className="input small"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />

        <select
          className="input small"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="mcq">MCQ</option>
          <option value="text">Subjective</option>
        </select>
      </div>
      
      <div className="row">
      {type === "mcq" && (
        <div className="options-container">
          {options.map((opt, i) => (
            <div key={i} className="option-row">
              <input
                type="radio"
                name="correct"
                className="radio"
                checked={correctIndex === i}
                onChange={() => setCorrectIndex(i)}
              />

              <input
                className="input"
                value={opt}
                placeholder={`Option ${i + 1}`}
                onChange={(e) => handleOptionChange(e.target.value, i)}
              />

              <button onClick={() => removeOption(i)}>✕</button>
            </div>
          ))}

          <button className="btn" onClick={addOption}>
            + Add Option
          </button>
        </div>
      )}

      {type === "text" && (
        <textarea
          className="input"
          placeholder="Correct answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}
</div>
      <button className="btn primary" onClick={handleSubmit}>
        Save Question
      </button>
    </div>
  );
};

export default QuestionForm;
