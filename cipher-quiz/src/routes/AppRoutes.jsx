import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/Auth';
import QuizForm from '../pages/QuizForm';
import QuestionMakingForm from '../pages/QuestionMakingForm';
import Home from '../pages/Home';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<AuthPage />} />
                <Route path="/quiz-form" element={<QuizForm />} />
                <Route path="/quiz-making-form" element={<QuestionMakingForm />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes