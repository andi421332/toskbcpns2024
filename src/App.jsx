import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestPage from './TestPage';
import ScorePage from './ScorePage';

function App() {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Routes >
                <Route path="/" element={<TestPage />} />
                <Route path="/score" element={<ScorePage />} />
            </Routes>
        </Router>
    );
}

export default App;
