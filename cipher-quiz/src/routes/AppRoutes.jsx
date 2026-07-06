import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/Auth";
import QuizForm from "../pages/QuizForm";
import QuestionForm from "../components/Creator/QuestionForm";
import QuestionMakingForm from "../pages/QuestionMakingForm";
import RequestRegister from "../pages/RequestRegister";
import Home from "../pages/Home";
import ProtectRoute from "./ProtectRoute";
import QuizRoom from "../pages/QuizRoom";
import Quiz from "../pages/Quiz";
import Profile from "../pages/Profile";
import Result from "../pages/Result";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<AuthPage />} />
        <Route element={<ProtectRoute />}>
          <Route path="/quiz-form" element={<QuizForm />} />
          <Route path="/quiz-making-form" element={<QuestionMakingForm />} />
          <Route path="/quiz-room/:quizId" element={<QuizRoom />} />
          <Route path="/quiz-making-form/:quizId" element={<QuestionForm />} />
          <Route path="quiz-request" element={<RequestRegister />}/>
          <Route path="/attempt-quiz/:quizId" element={<Quiz />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/result/:quizId/:userId" element={<Result />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
