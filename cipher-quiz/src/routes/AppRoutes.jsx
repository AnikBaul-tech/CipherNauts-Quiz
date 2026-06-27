import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/Auth';
import QuizForm from '../pages/QuizForm';
import QuestionForm from '../components/Creator/QuestionForm';
import QuestionMakingForm from '../pages/QuestionMakingForm';
import Home from '../pages/Home';
import ProtectRoute from './ProtectRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<AuthPage />} />
                <Route element={<ProtectRoute />}>
                    <Route path="/quiz-form" element={<QuizForm />} />
                    <Route path="/quiz-making-form" element={<QuestionMakingForm />} />
                    <Route
                        path="/quiz-making-form/:quizId"
                        element={<QuestionForm />}
                    />
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes