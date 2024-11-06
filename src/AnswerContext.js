// AnswerContext.js
import React, { createContext, useState, useContext } from 'react';

// Membuat context untuk jawaban
const AnswerContext = createContext();

// Provider untuk membagikan data answers ke seluruh komponen
export const AnswerProvider = ({ children }) => {
    const [answers, setAnswers] = useState({});  // Menyimpan jawaban

    return (
        <AnswerContext.Provider value={{ answers, setAnswers }}>
            {children}
        </AnswerContext.Provider>
    );
};

// Hook untuk mengakses context
export const useAnswers = () => useContext(AnswerContext);