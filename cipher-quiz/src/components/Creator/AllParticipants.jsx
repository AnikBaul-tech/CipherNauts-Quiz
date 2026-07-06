import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import "../../StyleSheet/AllParticipants.css"

const AllParticipants = ({quizId}) => {

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "quizzes", quizId, "requested"),

      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),
        }));

        setParticipants(data);
      }
    );

    return () => unsubscribe();
  }, [quizId]);

  const updateStatus = async (participant, status) => {
    await updateDoc(
      doc(db, "quizzes", quizId, "requested", participant.id),

      {
        status,
      }
    );

    await updateDoc(
      doc(db, "users", participant.id, "requestQuiz", quizId),

      {
        status,
      }
    );
  };

  const requested = participants.filter((p) => p.status === "requested");

  const accepted = participants.filter((p) => p.status === "accepted");

  const rejected = participants.filter((p) => p.status === "rejected");

  return (
    <div className="participants-page">
      <h2>Pending Requests</h2>

      {requested.map((user) => (
        <div className="participant-card" key={user.id}>
          <div>
            <h3>{user.requesterName}</h3>
          </div>

          <div>
            <button onClick={() => updateStatus(user, "accepted")}>
              Accept
            </button>

            <button onClick={() => updateStatus(user, "rejected")}>
              Reject
            </button>
          </div>
        </div>
      ))}

      <h2>Accepted</h2>

      {accepted.map((user) => (
        <div className="participant-card" key={user.id}>
          <Link to={`/profile/${user.id}`}><h3>{user.requesterName}</h3></Link>

          <span className="status-accepted">Accepted</span>
        </div>
      ))}

      <h2>Rejected</h2>

      {rejected.map((user) => (
        <div className="participant-card" key={user.id}>
          <h3>{user.requesterName}</h3>

          <span className="status-rejected">Rejected</span>
        </div>
      ))}
    </div>
  );
};

export default AllParticipants;
