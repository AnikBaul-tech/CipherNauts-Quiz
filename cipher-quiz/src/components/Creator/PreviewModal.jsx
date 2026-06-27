import React from "react";
import "../../StyleSheet/PreviewModal.css";

const PreviewModal = ({ show, quizData, onClose, onConfirm }) => {

    if (!show) return null;

    return (

        <div className="modal-overlay">

            <div className="preview-modal">

                <div className="modal-header">

                    <h2>Confirm Quiz Details</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    <div className="preview-row">
                        <span>Quiz Title</span>
                        <p>{quizData.title}</p>
                    </div>

                    <div className="preview-row">
                        <span>Topic</span>
                        <p>{quizData.topic}</p>
                    </div>

                    <div className="preview-row">
                        <span>Description</span>
                        <p>{quizData.description}</p>
                    </div>

                    <div className="preview-row">
                        <span>Starts At</span>
                        <p>{quizData.startTime}</p>
                    </div>

                    <div className="preview-row">
                        <span>Ends At</span>
                        <p>{quizData.endTime}</p>
                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Edit
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >
                        Confirm & Continue
                    </button>

                </div>

            </div>

        </div>

    );

};

export default PreviewModal;