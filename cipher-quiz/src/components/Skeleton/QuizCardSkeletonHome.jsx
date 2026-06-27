import "../../StyleSheet/QuizCardSkeletonHome.css";

const QuizCardSkeleton = () => {
  return (
    <div className="quiz-card skeleton-card">

      <div className="skeleton skeleton-title"></div>

      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description short"></div>

      <div className="quiz-info">
        <div className="skeleton skeleton-info"></div>
        <div className="skeleton skeleton-info"></div>
      </div>

      <div className="quiz-info">
        <div className="skeleton skeleton-info"></div>
        <div className="skeleton skeleton-info"></div>
      </div>

      <div className="quiz-card-buttons">
        <div className="skeleton skeleton-btn"></div>
        <div className="skeleton skeleton-btn"></div>
      </div>

    </div>
  );
};

export default QuizCardSkeleton;