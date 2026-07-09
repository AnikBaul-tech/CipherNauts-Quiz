import React, { use, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  onSnapshot,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import Subheading from "../components/User/Subheading";
import Timer from "../components/User/Timer";
import Reflector from "../components/User/Reflector";
import QuizForm from "../pages/QuizForm";

import "../StyleSheet/Quiz.css";
import { toast } from "react-toastify";

const Quiz = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);

  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [attempted, setAttempted] = useState([]);

  const [timeLeft, setTimeLeft] = useState(0);

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const submittedRef = useRef(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    console.log("Answers Updated:", answers);
  }, [answers]);

  // get quiz data
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "quizzes", quizId),

      (snapshot) => {
        if (snapshot.exists()) {
          setQuiz({
            id: snapshot.id,

            ...snapshot.data(),
          });
        }

        setLoadingQuiz(false);
      }
    );

    return () => unsubscribe();
  }, [quizId]);

  // get questions
  useEffect(() => {
    if (!quizId) return;

    const unsubscribe = onSnapshot(
      collection(db, "quizzes", quizId, "questions"),

      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),
        }));

        setQuestions(data);
        setLoadingQuestions(false);
      }
    );

    return () => unsubscribe();
  }, [quizId]);

  // check if user is registered for the quiz
  useEffect(() => {
    if (!quizId || !user) return;

    const checkPermission = async () => {
      try {
        const requestRef = doc(
          db,

          "users",

          user.uid,

          "requestQuiz",

          quizId
        );

        const requestSnap = await getDoc(requestRef);

        if (!requestSnap.exists()) {
          toast.warning("You are not registered for this quiz.");

          navigate("/home");

          return;
        }

        const data = requestSnap.data();

        if (data.status === "attempted") {
          toast.info("Quiz already attempted.");
          navigate("/home");
          return;
        }

        if (data.status !== "accepted") {
          toast.warning("You are not allowed .");

          navigate("/home");

          return;
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkPermission();
  }, [quizId, user]);

  // check if quiz has ended
  useEffect(() => {
    if (!quiz) return;

    const interval = setInterval(() => {
      setQuizEnded(Date.now() >= quiz.endTime.toMillis());
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz]);

  const submitQuiz = async () => {
    if (submittedRef.current) return;

    if (questions.length === 0) return;

    if (Object.keys(answers).length === 0) return;

    submittedRef.current = true;
    setSubmitted(true);

    try {
      const attemptId = `${quizId}_${user.uid}`;

      let score = 0;
      let totalMarks = 0;

      const responses = [];

      if (questions.length === 0) {
        toast.info("Questions are still loading.");
        submittedRef.current = false;
        setSubmitted(false);
        return;
      }

      console.log("Questions:", questions);
      console.log("Answers:", answers);

      questions.forEach((question) => {
        console.log(question.id, answers[question.id]);
        const selectedAnswer = answers[question.id] ?? null;

        const correctAnswer = question.correctAnswer;

        const isCorrect = selectedAnswer === correctAnswer;

        totalMarks += question.points;

        if (isCorrect) {
          score += question.points;
        }

        responses.push({
          questionId: question.id,

          question: question.question,

          type: question.type,

          points: question.points,

          options: question.options || [],

          selectedAnswer,

          correctAnswer,

          obtainedMarks: isCorrect ? question.points : 0,

          isCorrect,
        });
      });

      // Save Attempt Metadata

      await setDoc(
        doc(db, "attempts", attemptId),

        {
          quizId,

          userId: user.uid,

          submittedAt: serverTimestamp(),

          score,

          totalMarks,

          totalQuestions: questions.length,

          percentage:
            totalMarks === 0
              ? 0
              : Number(((score / totalMarks) * 100).toFixed(2)),
        }
      );

      // Save every response

      for (const response of responses) {
        await setDoc(
          doc(
            db,

            "attempts",

            attemptId,

            "responses",

            response.questionId
          ),

          {
            question: response.question,

            type: response.type,

            points: response.points,

            options: response.options,

            selectedAnswer: response.selectedAnswer,

            correctAnswer: response.correctAnswer,

            obtainedMarks: response.obtainedMarks,

            isCorrect: response.isCorrect,
          }
        );
      }

      // Update user request status

      await updateDoc(
        doc(db, "users", user.uid, "requestQuiz", quizId),

        {
          status: "attempted",
        }
      );

      // Update quiz participant status

      await updateDoc(
        doc(db, "quizzes", quizId, "requested", user.uid),

        {
          status: "attempted",
        }
      );

      toast.success("Quiz Submitted Successfully.");

      navigate(`/result/${quizId}/${user.uid}`);
    } catch (err) {
      submittedRef.current = false;
      setSubmitted(false);
    }
  };

  console.log("Submit received:", answers);

  if (loadingQuestions || loadingQuiz) {
    return <h2>Loading ....</h2>;
  }

  return (
    <div className="quiz-page">
      <div className="quiz-wrapper">
        <div className="quiz-heading">
          <div>
            <h1>Attempt Quiz</h1>
            <p>Answer every question before the timer expires.</p>
          </div>
        </div>

        <Subheading quiz={quiz} />

        <div className="quiz-container">
          <div className="quiz-left">
            <QuizForm
              questions={questions}
              attempted={attempted}
              setAttempted={setAttempted}
              answers={answers}
              setAnswers={setAnswers}
              submitted={submitted}
              onSubmit={submitQuiz}
              disabled={quizEnded}
            />
          </div>

          <div className="quiz-right">
            <div className="timer-card">
              <Timer
                endTime={quiz.endTime}
                warningTime={60}
                pause={submitted}
                onTick={setTimeLeft}
                onTimeUp={submitQuiz}
              />
            </div>

            <div className="reflector-card">
              <Reflector
                totalQs={quiz.totalQuestions}
                attempted={attempted}
                timeLeft={timeLeft}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
