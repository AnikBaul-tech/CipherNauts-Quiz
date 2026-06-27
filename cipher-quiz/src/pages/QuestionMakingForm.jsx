import React, { useState } from "react";
import "../StyleSheet/QuestionMakingForm.css";
import { doc, addDoc, getDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../components/Creator/PreviewModal";
import { auth } from "../config/Firebase";



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

      console.log("Current User:", user);
      console.log("UID:", user?.uid);
      const now = new Date();

      const start = new Date(quizData.startTime);
      const end = new Date(quizData.endTime);

      if (end <= start) {
        alert("End time must be after start time.");
        return;
      }

      if (start <= now) {
        alert("Start time must be in the future.");
        return;
      }

      if (end <= now) {
        alert("End time has already passed.");
        return;
      }

      const docRef = await addDoc(
        collection(db, "quizzes"),
        {
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

          status: "draft"
        }
      );

      setShowPreview(false);

      navigate(`/quiz-making-form/${docRef.id}`);



    } catch (error) {

      console.error(error);

      alert("Unable to create quiz.");

    }
  };
  return (
    <div>
      <div className="quiz-form-container">
        <form className="quiz-form">

          <h2>Create New Quiz</h2>

          <input type="text" placeholder="Quiz Title..." onChange={(e) => setQuizData({ ...quizData, title: e.target.value })} />
          <input type="text" placeholder="Topic..." onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })} />
          <textarea
            rows="4"
            placeholder="Description..."
            onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
          ></textarea>

          <input type="datetime-local" placeholder="Starting Time" onChange={(e) => setQuizData({ ...quizData, startTime: e.target.value })} />
          <input type="datetime-local" placeholder="Ending Time" onChange={(e) => setQuizData({ ...quizData, endTime: e.target.value })} />

          <button type="submit" onClick={activeModal}>
            Create Quiz
          </button>

        </form>
      </div>
      <PreviewModal show={showPreview} quizData={quizData} onClose={() => setShowPreview(false)} onConfirm={handleCreateQuiz} />
    </div>
  );
};

export default QuestionMakingForm;
