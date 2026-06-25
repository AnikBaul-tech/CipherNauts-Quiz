import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheet/HomePage.css";

const Home = () => {
  const previousQuizzes = [
    {
      id: 1,
      title: "Java Basics Quiz",
      author: "Anik",
      marks: 50,
      status: "Created",
    },
    {
      id: 2,
      title: "React Fundamentals",
      author: "Admin",
      marks: 40,
      status: "Attempted",
    },
    {
      id: 3,
      title: "Physics Mock Test",
      author: "Teacher",
      marks: 100,
      status: "Attempted",
    },
  ];
  const navigate = useNavigate();

  const createQuiz =() => {
    navigate("/quiz-making-form")
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

      <div className="previous">
        <div className="section-title">Previous Activity</div>

        <div className="quiz-list">
          {previousQuizzes.map((quiz) => (
            <div className="quiz-card" key={quiz.id}>
              <div className="quiz-top">
                <div>
                  <div className="quiz-title">{quiz.title}</div>

                  <div className="quiz-author">by {quiz.author}</div>
                </div>

                <div className={`quiz-status ${quiz.status.toLowerCase()}`}>
                  {quiz.status}
                </div>
              </div>

              <div className="quiz-bottom">
                <div className="quiz-marks">{quiz.marks} Marks</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
