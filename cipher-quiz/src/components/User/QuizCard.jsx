import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "../../StyleSheet/QuizCard.css"

const QuizCard = ({ quiz, view, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const now = new Date();

  const startTime = quiz.startTime?.toDate();
  const endTime = quiz.endTime?.toDate();

  const renderAction = () => {
    switch (view) {
      case "created":
        return (
          <div className="quiz-actions">
            <button
              className="btn-primary"
              onClick={() => navigate(`/quiz-room/${quiz.id}`)}
            >
              Open Quiz Room
            </button>

            <button
              className="btn-delete-home"
              onClick={() => onDelete(quiz)}
            >
              Delete
            </button>
          </div>
        );

      case "pending":
        return (
          <button className="btn-secondary" disabled>
            Request Pending
          </button>
        );

      case "registered":
        if (startTime && now < startTime) {
          return (
            <button className="btn-secondary" disabled>
              Starts Soon
            </button>
          );
        }

        if (startTime && endTime && now >= startTime && now <= endTime) {
          return (
            <button
              className="btn-primary"
              onClick={() => navigate(`/attempt-quiz/${quiz.id}`)}
            >
              Start Quiz
            </button>
          );
        }

        return (
          <button className="btn-secondary" disabled>
            Quiz Ended
          </button>
        );

      case "participated":
        return (
          <button
            className="btn-primary"
            onClick={() => navigate(`/result/${quiz.id}/${user.uid}`)}
          >
            View Result
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="quiz-card">

      <h2>{quiz.title}</h2>

      <p className="quiz-description">{quiz.description}</p>

      {view === "created" && (
        <span className="status">
          {quiz.status === "draft" ? (
            <p id="draft">Draft</p>
          ) : (
            <p id="published">Published</p>
          )}
        </span>
      )}

      <div className="quiz-info">
        <span>{quiz.topic}</span>

        <span>{quiz.totalQuestions} Questions</span>
      </div>

      <div className="quiz-info">
        <span>{quiz.totalMarks} Marks</span>

        <span>{quiz.authorName}</span>
      </div>

      {renderAction()}

    </div>
  );
};

export default QuizCard;