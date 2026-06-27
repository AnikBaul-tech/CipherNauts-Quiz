import React from 'react'
import '../../StyleSheet/AddedQuestions.css'

const AddedQuestions = ({ questions, onDelete }) => {
    return (
        <div className="previous-questions">

            <h2 className='heading-primary'>Questions Added</h2>

            {

                questions.map((question, index) => (

                    <div
                        className="question-preview-card"
                        key={question.id}
                    >

                        <div className="preview-header">

                            <span>
                                Question {index + 1}
                            </span>

                            <span>
                                {question.points} Marks
                            </span>

                        </div>

                        <div className="preview-question">

                            {question.question}

                        </div>
                        <div className="question-actions">

                            <button

                                className="delete-question-btn"

                                onClick={() => onDelete(question)}

                            >

                                Delete Question

                            </button>

                        </div>

                        {

                            question.type === "mcq" && (

                                <div className="preview-options">

                                    {

                                        question.options.map((option, i) => (

                                            <div
                                                key={i}
                                                className={`preview-option ${option === question.correctAnswer
                                                    ? "correct-option"
                                                    : ""
                                                    }`}
                                            >

                                                {String.fromCharCode(65 + i)}.
                                                {" "}
                                                {option}

                                            </div>

                                        ))

                                    }

                                </div>

                            )

                        }

                        {

                            question.type === "text" && (

                                <div className="subjective-answer">

                                    <strong>Answer :</strong>

                                    <p>

                                        {question.correctAnswer}

                                    </p>

                                </div>

                            )

                        }

                    </div>

                ))

            }

        </div>
    )
}

export default AddedQuestions