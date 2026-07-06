import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/Firebase";
import "../../StyleSheet/SettingsView.css"

const SettingsView = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "quizzes", quizId),

      (snapshot) => {
        setQuiz({
          id: snapshot.id,

          ...snapshot.data(),
        });
      }
    );

    return () => unsubscribe();
  }, [quizId]);

  if (!quiz) return <h3>Loading...</h3>;

  return (
    <div className="settings-page">
      <h2>Quiz Settings</h2>

      <div className="setting-row">
        <span>Quiz ID</span>

        <span>{quiz.id}</span>
      </div>

      <div className="setting-row">
        <span>Title</span>

        <span>{quiz.title}</span>
      </div>

      <div className="setting-row">
        <span>Description</span>

        <span>{quiz.description}</span>
      </div>

      <div className="setting-row">
        <span>Topic</span>

        <span>{quiz.topic}</span>
      </div>

      <div className="setting-row">
        <span>Status</span>

        <span>{quiz.status}</span>
      </div>

      <div className="setting-row">
        <span>Questions</span>

        <span>{quiz.totalQuestions}</span>
      </div>

      <div className="setting-row">
        <span>Total Marks</span>

        <span>{quiz.totalMarks}</span>
      </div>

      <div className="setting-row">
        <span>Start Time</span>

        <span>{quiz.startTime?.toDate().toLocaleString()}</span>
      </div>

      <div className="setting-row">
        <span>End Time</span>

        <span>{quiz.endTime?.toDate().toLocaleString()}</span>
      </div>

      <button onClick={() => navigator.clipboard.writeText(quiz.id)}>
        Copy Quiz ID
      </button>
    </div>
  );
};

export default SettingsView;
