import React, { useEffect, useState } from "react";
import Header from "../User/Header";
import "../../StyleSheet/ViewResult.css";

import { useNavigate, useParams } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../config/Firebase";

const ViewResult = ({ quizId }) => {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const snapshot = await getDocs(
        query(
          collection(db, "attempts"),

          where("quizId", "==", quizId)
        )
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

      data.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return b.percentage - a.percentage;
      });

      setResults(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header />
      <div className="view-result-page">
        <div className="result-header">
          <h1>Quiz Leaderboard</h1>
        </div>

        <div className="participant-table">
          <div className="table-head">
            <span>Rank</span>

            <span>Participant</span>

            <span>Score</span>

            <span>Percentage</span>

            <span>Action</span>
          </div>

          {results.length === 0 ? (
            <div className="no-result">No participant has submitted yet.</div>
          ) : (
            results.map((participant, index) => (
              <div className="table-row" key={participant.id}>
                <span>#{index + 1}</span>

                <span>{participant.userId}</span>

                <span>
                  {participant.score} / {participant.totalMarks}
                </span>

                <span>{participant.percentage}%</span>

                <button
                  onClick={() =>
                    navigate(`/result/${quizId}/${participant.userId}`)
                  }
                >
                  View Result
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ViewResult;
