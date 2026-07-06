import React, { useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useAuth } from "../context/AuthProvider";
import "../StyleSheet/RequestRegister.css";
import Header from "../components/User/Header";

const RequestRegister = () => {
  const { user } = useAuth();

  const [quizId, setQuizId] = useState("");

  const [quiz, setQuiz] = useState(null);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("idle");

  /*
      idle
      not-found
      requested
      registered
      ready
  */

  const handleSearch = async () => {
    if (quizId.trim() === "") {
      alert("Enter Quiz ID");
      return;
    }

    setLoading(true);

    try {
      const quizRef = doc(db, "quizzes", quizId.trim());

      const quizSnap = await getDoc(quizRef);

      if (!quizSnap.exists()) {
        setQuiz(null);

        setStatus("not-found");

        return;
      }

      const quizData = quizSnap.data();

      if (quizData.status !== "published") {
        alert("This quiz is not published.");

        setQuiz(null);

        return;
      }

      setQuiz({
        id: quizSnap.id,

        ...quizData,
      });

      const now = new Date();

      if (quizData.endTime.toDate() < now) {
        setStatus("ended");

        return;
      }

      const requestRef = doc(db, "users", user.uid, "requestQuiz", quizId);

      const requestSnap = await getDoc(requestRef);

      if (!requestSnap.exists()) {
        setStatus("ready");
      } else {
        const requestData = requestSnap.data();

        setStatus(requestData.status);
      }
    } catch (err) {
      console.log(err);

      alert("Unable to search quiz.");
    } finally {
      setLoading(false);
    }
  };

  const requestRegistration = async () => {
    try {
      const requestData = {
        requesterUid: user.uid,

        requesterName: user.displayName,

        requesterEmail: user.email,

        status: "requested",

        requestedAt: serverTimestamp(),
      };

      // Store under current user's requests

      await setDoc(
        doc(db, "users", user.uid, "requestQuiz", quiz.id),

        {
          quizId: quiz.id,
          status: "requested",
          requestedAt: serverTimestamp(),
        }
      );

      // Store inside quiz

      await setDoc(
        doc(db, "quizzes", quiz.id, "requested", user.uid),

        requestData
      );

      setStatus("requested");

      alert("Registration request sent.");
    } catch (err) {
      console.log(err);

      alert("Unable to send request.");
    }
  };

  return (
    <>
      <Header />
      <div className="request-register-page">
        <h1 className="main-heading">Register For Quiz</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Paste Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <h3>Searching...</h3>}

        {status === "not-found" && <h3>Quiz Not Found</h3>}

        {quiz && (
          <div className="quiz-card">
            <h2>{quiz.title}</h2>

            <p>{quiz.description}</p>

            <div className="quiz-info">
              <span>Topic : {quiz.topic}</span>
            </div>

            <div className="quiz-info">
              <span>Author : {quiz.authorName}</span>
            </div>

            <div className="quiz-info">
              <span>Questions : {quiz.totalQuestions}</span>
            </div>

            <div className="quiz-info">
              <span>Total Marks : {quiz.totalMarks}</span>
            </div>

            <div className="quiz-info">
              <span>Created : {quiz.createdAt?.toDate().toLocaleString()}</span>
            </div>

            <div className="quiz-info">
              <span>Starts : {quiz.startTime.toDate().toLocaleString()}</span>
            </div>

            <div className="quiz-info">
              <span>Ends : {quiz.endTime.toDate().toLocaleString()}</span>
            </div>

            {status === "ready" && (
              <button onClick={requestRegistration}>
                Request Registration
              </button>
            )}

            {status === "requested" && (
              <button disabled>Request Pending</button>
            )}

            {status === "accepted" && (
              <button disabled>Registration Accepted</button>
            )}

            {status === "rejected" && (
              <button disabled>Registration Rejected</button>
            )}

            {status === "ended" && <button disabled>Quiz Ended</button>}
          </div>
        )}
      </div>
    </>
  );
};

export default RequestRegister;
