import React, { useState } from "react";
import "../StyleSheet/QuestionMakingForm.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../components/Creator/PreviewModal";
import { auth } from "../config/Firebase";
import Header from "../components/User/Header";
import { toast } from "react-toastify";

const QuestionMakingForm = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [showPreview, setShowPreview] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    topic: "",
    startTime: "",
    endTime: "",
    totalMarks: 0,
    totalQuestions: 0,
  });

  const activeModal = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };
  const handleCreateQuiz = async () => {
    try {
      const now = new Date();

      const start = new Date(quizData.startTime);
      const end = new Date(quizData.endTime);

      if (end <= start) {
        toast.warning("End time must be after start time.");
        return;
      }

      if (start <= now) {
        toast.warning("Start time must be in the future.");
        return;
      }

      if (end <= now) {
        toast.warning("End time has already passed.");
        return;
      }

      const docRef = await addDoc(collection(db, "quizzes"), {
        title: quizData.title,
        topic: quizData.topic,
        description: quizData.description,

        authorId: user.uid,
        authorName: user.displayName,

        startTime: Timestamp.fromDate(new Date(quizData.startTime)),
        endTime: Timestamp.fromDate(new Date(quizData.endTime)),
        totalMarks: 0,
        totalQuestions: 0,

        createdAt: serverTimestamp(),

        status: "draft",
      });

      setShowPreview(false);

      navigate(`/quiz-room/${docRef.id}`);
    } catch (error) {
      console.error(error);

      toast.error("Unable to create quiz.");
    }
  };
  return (
    <div className="question-making-page">
      <Header />
      <div className="quiz-form-container">
        <form className="quiz-form">
          <div className="quiz-form-header">
            <div>
              <p className="form-eyebrow">Quiz Builder</p>
              <h2>Create New Quiz</h2>
            </div>
            <p className="form-description">
              Set up your quiz details and publish it when you are ready.
            </p>
          </div>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Quiz Title"
              onChange={(e) =>
                setQuizData({ ...quizData, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Topic"
              onChange={(e) =>
                setQuizData({ ...quizData, topic: e.target.value })
              }
            />
            <textarea
              rows="4"
              placeholder="Description"
              onChange={(e) =>
                setQuizData({ ...quizData, description: e.target.value })
              }
            ></textarea>
            <input
              type="datetime-local"
              placeholder="Starting Time"
              onChange={(e) =>
                setQuizData({ ...quizData, startTime: e.target.value })
              }
            />
            <input
              type="datetime-local"
              placeholder="Ending Time"
              onChange={(e) =>
                setQuizData({ ...quizData, endTime: e.target.value })
              }
            />
          </div>

          <button type="submit" onClick={activeModal}>
            Create Quiz
          </button>
        </form>
      </div>
      <PreviewModal
        show={showPreview}
        quizData={quizData}
        onClose={() => setShowPreview(false)}
        onConfirm={handleCreateQuiz}
      />
    </div>
  );
};

export default QuestionMakingForm;
