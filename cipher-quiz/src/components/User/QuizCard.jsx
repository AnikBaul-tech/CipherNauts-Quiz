import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, onDelete }) => {

    const navigate = useNavigate();

    return (

        <>

            <div className="quiz-card">

                <h2>{quiz.title}</h2>

                <p>{quiz.description}</p>

                <div className="quiz-info">

                    <span>{quiz.topic}</span>

                    <span>{quiz.totalQuestions} Questions</span>

                </div>

                <div className="quiz-info">

                    <span>{quiz.totalMarks} Marks</span>

                    <span>{quiz.authorName}</span>

                </div>

                <button onClick={() => navigate(`/quiz-making-form/${quiz.id}`)}>

                    Open Quiz

                </button>


                <button
                    className="delete-btn"
                    onClick={() => onDelete(quiz)}
                >

                    Delete

                </button>

            </div>
        </>

    )

}

export default QuizCard;