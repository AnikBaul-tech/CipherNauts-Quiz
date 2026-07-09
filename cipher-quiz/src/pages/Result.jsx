import React, { useEffect, useState } from "react";
import Header from "../components/User/Header.jsx";
import "../StyleSheet/Result.css";

import { useParams } from "react-router-dom";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";

import { db } from "../config/Firebase";

import ResultSummary from "../components/User/Result/ResultSummary.jsx";
import ResultQuestion from "../components/User/Result/ResultQuestion.jsx";

const Result = () => {
  const { quizId, userId } = useParams();

  const [attempt, setAttempt] = useState(null);

  const [responses, setResponses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      const attemptId = `${quizId}_${userId}`;

      const attemptRef = doc(
        db,

        "attempts",

        attemptId
      );

      const attemptSnap = await getDoc(attemptRef);

      if (!attemptSnap.exists()) {
        setLoading(false);

        return;
      }

      setAttempt(attemptSnap.data());

      const responseSnap = await getDocs(
        collection(
          db,

          "attempts",

          attemptId,

          "responses"
        )
      );

      const data = responseSnap.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

      setResponses(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!attempt) {
    return <h2>No Result Found</h2>;
  }

  return (
    <>
      <Header />
      <div className="result-page">
        <div className="result-left">
          <div className="result-heading">
            <h1>Quiz Result</h1>
            <p>Review every answer and compare it with the correct solution.</p>
          </div>

          {responses.map((response, index) => (
            <ResultQuestion
              key={response.id}
              index={index}
              response={response}
            />
          ))}
        </div>

        <div className="result-right">
          <ResultSummary attempt={attempt} responses={responses} />
        </div>
      </div>
    </>
  );
};

export default Result;
