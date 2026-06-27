import "../../StyleSheet/QuestionFormSkeleton.css";

const QuestionFormSkeleton = () => {

    return (

        <div className="question-form-skeleton">

            <div className="sk sk-title"></div>

            <div className="sk sk-input"></div>

            <div className="sk-row">

                <div className="sk sk-small"></div>

                <div className="sk sk-small"></div>

            </div>

            <div className="sk sk-option"></div>
            <div className="sk sk-option"></div>
            <div className="sk sk-option"></div>
            <div className="sk sk-option"></div>

            <div className="sk sk-btn"></div>

        </div>

    );

}

export default QuestionFormSkeleton;