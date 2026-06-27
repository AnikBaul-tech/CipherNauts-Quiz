import React from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheet/HomePage.css";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { useAuth } from "../context/AuthProvider";
import QuizCard from "../components/User/QuizCard";
import  QuizCardSkeleton  from "../components/Skeleton/QuizCardSkeletonHome.jsx"

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const { user, loading, logout } = useAuth();

  if (loading) {

    return <div>Loading...</div>;

  }

  useEffect(() => {

    const q = query(

      collection(db, "quizzes"),

      where("status", "==", "published"),
      where("authorId", "==", user?.uid)

    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

      }));

      setQuizzes(data);

      setLoadingQuizzes(false);


    });

    return () => unsubscribe();

  }, []);
  const navigate = useNavigate();

  const signOutWithGoogle = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  const createQuiz = () => {
    navigate("/quiz-making-form")
  }
  const deleteQuiz = async () => {

    if (!selectedQuiz) return;

    try {

      const snapshot = await getDocs(

        collection(
          db,
          "quizzes",
          selectedQuiz.id,
          "questions"
        )

      );

      for (const question of snapshot.docs) {

        await deleteDoc(question.ref);

      }

      await deleteDoc(

        doc(
          db,
          "quizzes",
          selectedQuiz.id
        )

      );

      setShowDeleteModal(false);

      setSelectedQuiz(null);

    }
    catch (err) {

      console.log(err);

      alert("Unable to delete quiz");

    }

  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="main-heading">Quiz Dashboard</h1>

        <div className="subheading-container">
          <div className="subheading-content">
            <div className="code-line">
              <span className="code-key">status:</span>{" "}
              <span className="code-accent">"authenticated"</span>
            </div>

            <div className="code-line">
              <span className="code-key">mode:</span>{" "}
              <span className="code-value">"quiz-management"</span>
            </div>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={signOutWithGoogle}
        >
          Logout
        </button>
      </div>

      {/* Create Quiz Section */}
      <div className="home-options-container">
        <div className="create-card">
          <button className="create-icon" onClick={createQuiz}>+</button>
          <div className="create-content">
            <h2>Create Quiz</h2>
            <p>
              Create a new timed quiz form with MCQ and subjective questions.
            </p>
          </div>
        </div>
      </div>

      <div className="published-quizzes">

        {
          loadingQuizzes ?

            Array.from({ length: 6 }).map((_, index) => (

              <QuizCardSkeleton key={index} />

            ))

            :

            quizzes.length === 0 ?

              <h3>No Published Quiz Yet</h3>

              :

              quizzes.map((quiz) => (

                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onDelete={(quiz) => {

                    setSelectedQuiz(quiz);

                    setShowDeleteModal(true);

                  }}
                />

              ))
        }

      </div>
      {
        showDeleteModal && (

          <div className="modal-overlay">

            <div className="delete-modal">

              <h2>

                Delete Quiz

              </h2>

              <p>

                Are you sure you want to delete

              </p>

              <h3>

                {selectedQuiz?.title}

              </h3>

              <p>

                This action cannot be undone.

              </p>

              <div className="modal-buttons">

                <button

                  onClick={() => {

                    setShowDeleteModal(false);

                    setSelectedQuiz(null);

                  }}

                >

                  Cancel

                </button>

                <button

                  className="delete-btn"

                  onClick={deleteQuiz}

                >

                  Delete

                </button>

              </div>

            </div>

          </div>

        )
      }
    </div>
  );
};

export default Home;
