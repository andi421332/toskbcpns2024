import React from 'react';
import { useLocation } from 'react-router-dom';

const ScorePage = () => {
    const location = useLocation();
    const { score } = location.state || { score: 0 };

    return (
        <div className="score-container">
            <h1>Ujian Selesai</h1>
            <h2>Skor Anda: {score}</h2>
        </div>
    );
};

export default ScorePage;
