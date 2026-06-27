import "../../StyleSheet/QuestionFormSkeleton.css";

const AddedQuestionsSkeleton = () => {

    return (

        <div className="previous-questions">

            <div className="sk sk-heading"></div>

            {

                Array.from({ length: 3 }).map((_, index) => (

                    <div
                        key={index}
                        className="question-preview-card"
                    >

                        <div className="sk sk-title"></div>

                        <div className="sk sk-question"></div>

                        <div className="sk sk-question short"></div>

                        <div className="sk sk-option"></div>

                        <div className="sk sk-option"></div>

                    </div>

                ))

            }

        </div>

    )

}

export default AddedQuestionsSkeleton;