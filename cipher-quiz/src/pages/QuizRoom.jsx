import React from "react";
import QuestionForm from "../components/Creator/QuestionForm";
import AllParticipants from "../components/Creator/AllParticipants";
import SettingsView from "../components/Creator/SettingsView";
import ViewResult from "../components/Creator/ViewResult";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../StyleSheet/QuizRoom.css";
import Header from "../components/User/Header";

const QuizRoom = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const { quizId } = useParams();

  return (
    <>
      <Header />
      <div className="quiz-room-page">
        <div className="quiz-room-header">
          <h1>Quiz Room</h1>
          <p>Manage questions, participants, results and quiz settings.</p>
        </div>
        <div className="quiz-room-nav">
          <button
            className={activeTab === "questions" ? "active" : ""}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>

          <button
            className={activeTab === "participants" ? "active" : ""}
            onClick={() => setActiveTab("participants")}
          >
            Participants
          </button>

          <button
            className={activeTab === "result" ? "active" : ""}
            onClick={() => setActiveTab("result")}
          >
            View Result
          </button>

          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
        {activeTab === "questions" && <QuestionForm quizId={quizId} />}

        {activeTab === "participants" && <AllParticipants quizId={quizId} />}

        {activeTab === "result" && <ViewResult quizId={quizId} />}

        {activeTab === "settings" && <SettingsView quizId={quizId} />}
      </div>
    </>
  );
};

export default QuizRoom;
