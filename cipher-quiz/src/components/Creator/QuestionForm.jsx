import React, { useState, useEffect } from "react";
import "../../StyleSheet/QuestionForm.css";
import {
  addDoc,
  collection,
  doc,
  increment,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/Firebase";
import AddedQuestions from "./AddedQuestions";
import { toast } from "react-toastify";
import QuestionFormSkeleton from "../Skeleton/QuestionFormSkeleton";
import AddedQuestionsSkeleton from "../Skeleton/AddedQuestionSkeleton";

const QuestionForm = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null); // to fetch the quiz details
  const [questions, setQuestions] = useState([]); // to store the questions which are already added
  const [question, setQuestion] = useState(""); // to store the question which is currently being added
  const [points, setPoints] = useState(1);
  const [type, setType] = useState("mcq");
  const [options, setOptions] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [answer, setAnswer] = useState("");
  // const [hints,setHints] = useState("");

  const [quizLoading, setQuizLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(quizId);
  console.log(typeof quizId);

  // for the questions which are already added to show in the top
  useEffect(() => {
    const q = query(collection(db, "quizzes", quizId, "questions"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions(data);

      setQuestionsLoading(false);
    });

    return () => unsubscribe();
  }, [quizId]);

  // to get the quiz details
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "quizzes", quizId),

      (snapshot) => {
        if (snapshot.exists()) {
          setQuiz({
            id: snapshot.id,
            ...snapshot.data(),
          });
        }

        setQuizLoading(false);
      }
    );

    return () => unsubscribe();
  }, [quizId]);

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

  const resetForm = () => {
    setQuestion("");

    setPoints(1);

    setType("mcq");

    setOptions(["", ""]);

    setCorrectIndex(null);

    setAnswer("");

    // setHints("");
  };

  const addQuestion = async (questionData) => {
    try {
      await addDoc(
        collection(db, "quizzes", quizId, "questions"),

        {
          ...questionData,
        }
      );

      await updateDoc(
        doc(db, "quizzes", quizId),

        {
          totalQuestions: increment(1),
          totalMarks: increment(questionData.points),
        }
      );
    } catch (err) {
      toast.error("Failed to add question.");
      console.log(err);
    }
  };
  const deleteQuestion = async (question) => {
    try {
      await deleteDoc(doc(db, "quizzes", quizId, "questions", question.id));

      await updateDoc(
        doc(db, "quizzes", quizId),

        {
          totalQuestions: increment(-1),
          totalMarks: increment(-question.points),
        }
      );
    } catch (err) {
      console.log(err);
      toast.error("Unable to delete question.");
    }
  };

  const handleSubmit = async () => {
    if (options.length <= 1) {
      toast.warning("At least two options are required.");
      return;
    }

    if (type === "mcq" && correctIndex === null) {
      toast.warning("Please select the correct answer.");
    } else {
      const data =
        type === "mcq"
          ? {
              question,
              points: Number(points),
              type,
              options,
              correctAnswer: options[correctIndex],
              // hint: hints
            }
          : {
              question,
              points: Number(points),
              type,
              correctAnswer: answer,
              // hint: hints
            };

      await addQuestion(data);

      resetForm();
    }
  };

  const handleDraft = async () => {
    try {
      toast.success("Quiz saved as draft.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save draft.");
    }
  };

  const finishQuiz = async () => {
    try {
      const quizRef = doc(db, "quizzes", quizId);
      const quizSnap = await getDoc(quizRef);

      if (!quizSnap.exists()) {
        toast.error("Quiz not found.");
        return;
      }

      const quizData = quizSnap.data();
      console.log(quizData);

      if (quizData.totalQuestions === 0) {
        toast.warning("Add at least one question before publishing.");
        return;
      }

      if (quizData.totalMarks === 0) {
        toast.warning("Quiz must have total marks greater than 0.");
        return;
      }

      await updateDoc(quizRef, {
        status: "published",
      });

      toast.success(
        `Quiz published successfully!\nQuiz ID copied to clipboard.`
      );

      await navigator.clipboard.writeText(quizId);

      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish quiz.");
    }
  };

  const isEditable = quiz?.status === "draft";

  if (quizLoading || questionsLoading) {
    return (
      <>
        <AddedQuestionsSkeleton />

        <QuestionFormSkeleton />
      </>
    );
  }

  return (
    <div className="creator-shell">
      <AddedQuestions
        questions={questions}
        onDelete={deleteQuestion}
        isEditable={isEditable}
      />
      {isEditable && (
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

          {/* <div className="row">
          <input
            className="input"
            placeholder="Enter hint..."
            value={hints}
            onChange={(e) => setHints(e.target.value)}
          />
          </div> */}

          <div className="form-actions">
            <button className="btn primary" onClick={handleSubmit}>
              Save Question
            </button>

            <button className="btn primary" onClick={handleDraft}>
              Save as draft
            </button>

            <button className="btn primary" onClick={finishQuiz}>
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
