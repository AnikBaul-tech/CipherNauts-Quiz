import React from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheet/HomePage.css";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { useAuth } from "../context/AuthProvider";
import QuizCard from "../components/User/QuizCard";
import QuizCardSkeleton from "../components/Skeleton/QuizCardSkeletonHome.jsx";
import Header from "../components/User/Header.jsx";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [selectedOption, setSelectedOption] = useState("created");
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  //  Logics for the Selection Tab
  useEffect(() => {
    if (!user) return;

    setLoadingQuizzes(true);

    // ---------------- CREATED ----------------

    if (selectedOption === "created") {
      const q = query(
        collection(db, "quizzes"),

        where("authorId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),
        }));

        setQuizzes(data);

        setLoadingQuizzes(false);
      });

      return () => unsubscribe();
    }

    const fetchRequestQuizzes = async () => {
      try {
        let status = "";

        switch (selectedOption) {
          case "pending":
            status = "requested";

            break;

          case "registered":
            status = "accepted";

            break;

          case "participated":
            status = "attempted";

            break;

          default:
            return;
        }

        const requestQuery = query(
          collection(db, "users", user.uid, "requestQuiz"),

          where("status", "==", status)
        );

        const requestSnapshot = await getDocs(requestQuery);

        const quizPromises = requestSnapshot.docs.map(async (requestDoc) => {
          const quizRef = doc(
            db,

            "quizzes",

            requestDoc.id
          );

          const quizSnap = await getDoc(quizRef);

          if (!quizSnap.exists()) return null;

          return {
            id: quizSnap.id,

            ...quizSnap.data(),
          };
        });

        const quizzesData = (await Promise.all(quizPromises)).filter(Boolean);

        setQuizzes(quizzesData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingQuizzes(false);
      }
    };

    fetchRequestQuizzes();
  }, [selectedOption, user]);

  const navigate = useNavigate();

  const signOutWithGoogle = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const createQuiz = () => {
    navigate("/quiz-making-form");
  };
  const deleteQuiz = async () => {
    if (!selectedQuiz) return;

    try {
      // ----------------------------
      // Delete all questions
      // ----------------------------

      const questionSnapshot = await getDocs(
        collection(db, "quizzes", selectedQuiz.id, "questions")
      );

      for (const question of questionSnapshot.docs) {
        await deleteDoc(question.ref);
      }

      // ----------------------------
      // Delete all request records
      // ----------------------------

      const requestSnapshot = await getDocs(
        collection(db, "quizzes", selectedQuiz.id, "requested")
      );

      for (const request of requestSnapshot.docs) {
        const requesterId = request.id;

        // Remove from user's requestQuiz collection

        await deleteDoc(
          doc(db, "users", requesterId, "requestQuiz", selectedQuiz.id)
        );

        // Remove from quiz's requested collection

        await deleteDoc(request.ref);
      }

      // ----------------------------
      // Delete quiz document
      // ----------------------------

      await deleteDoc(doc(db, "quizzes", selectedQuiz.id));

      setShowDeleteModal(false);

      setSelectedQuiz(null);
    } catch (err) {
      console.log(err);

      alert("Unable to delete quiz.");
    }
  };
  const requestQuiz = async () => {
    navigate("/quiz-request");
  };

  const goToProfile = () => {
    navigate(`/profile/${user.uid}`);
  };

  return (
    <>
      <Header />
      <div className="home-page">
        <div className="home-header">
          <h1 className="main-heading">Quiz Dashboard</h1>

          <button className="logout-btn" onClick={signOutWithGoogle}>
            Logout
          </button>
        </div>

        {/* Create Quiz Section */}
        <div className="home-options-container">
          <div className="create-card">
            <button className="create-icon" onClick={createQuiz}>
              +
            </button>
            <div className="create-content">
              <h2>Create Quiz</h2>
              <p>
                Create a new timed quiz form with MCQ and subjective questions.
              </p>
            </div>
          </div>
        </div>

        <div className="home-options-container">
          <div className="create-card">
            <button className="create-icon" onClick={requestQuiz}>
              =
            </button>
            <div className="create-content">
              <h2>Attempt Quiz</h2>
              <p>Request to Register for a quiz.</p>
            </div>
          </div>
        </div>

        <div className="option-selector">
          <div
            className={`option ${selectedOption === "created" ? "active" : ""}`}
            onClick={() => setSelectedOption("created")}
          >
            Created
          </div>

          <div
            className={`option ${selectedOption === "pending" ? "active" : ""}`}
            onClick={() => setSelectedOption("pending")}
          >
            Pending
          </div>

          <div
            className={`option ${
              selectedOption === "registered" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("registered")}
          >
            Registered
          </div>

          <div
            className={`option ${
              selectedOption === "participated" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("participated")}
          >
            Participated
          </div>
        </div>

        <div className="published-quizzes">
          {loadingQuizzes ? (
            Array.from({ length: 6 }).map((_, index) => (
              <QuizCardSkeleton key={index} />
            ))
          ) : quizzes.length === 0 ? (
            <h3>No Published Quiz Yet</h3>
          ) : (
            quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                view={selectedOption}
                onDelete={(quiz) => {
                  setSelectedQuiz(quiz);

                  setShowDeleteModal(true);
                }}
              />
            ))
          )}
        </div>
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="delete-modal">
              <h2>Delete Quiz</h2>

              <p>Are you sure you want to delete</p>

              <h3>{selectedQuiz?.title}</h3>

              <p>This action cannot be undone.</p>

              <div className="modal-buttons">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);

                    setSelectedQuiz(null);
                  }}
                >
                  Cancel
                </button>

                <button className="delete-btn" onClick={deleteQuiz}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
