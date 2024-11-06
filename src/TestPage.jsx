import React, { useState, useEffect } from 'react';
import './cssGroup/TestPage.css';
import ButtonNumber from './ButtonNumber/ButtonNumber';
import BankSoal from './BankSoal.json';

const TestPage = () => {
    const tempquestion = BankSoal.questions.find(q => q.id === 1);
    const [selectedQuestion, setSelectedQuestion] = useState(tempquestion.question);
    const [selectedOptions, setSelectedOptions] = useState(tempquestion.options);
    const [nomorSoal, setNomorSoal] = useState(1);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [isTestEnded, setIsTestEnded] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);  // Array untuk menyimpan soal yang dijawab salah
    
    const handleQuestionSelect = (number) => {
        const question = BankSoal.questions.find(q => q.id === number);
        if (question) {
            setNomorSoal(number);
            setSelectedQuestion(question.question);
            setSelectedOptions(question.options);
            setSelectedOptionIndex(answers[number] ? "ABCDE".indexOf(answers[number]) : null);
        }
    };

    const [timeLeft, setTimeLeft] = useState(5400);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index);
    };

    const handleSave = () => {
        if (selectedOptionIndex !== null) {
            const selectedAnswer = "ABCDE"[selectedOptionIndex];

            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [nomorSoal]: selectedAnswer,
            }));

            setAnsweredQuestions((prev) => {
                if (!prev.includes(nomorSoal)) {
                    return [...prev, nomorSoal];
                }
                return prev;
            });

            if (nomorSoal < 100) {
                const nextQuestion = nomorSoal + 1;
                handleQuestionSelect(nextQuestion);
            }
        }
    };

    const handleEndTest = () => {
        let finalScore = 0;
        const wrongAnswers = [];

        BankSoal.questions.forEach((question) => {
            const userAnswer = answers[question.id];
            const namaBtn = document.getElementById(question.id);
            if (userAnswer === question.correct_answer) {
                finalScore += 5;
            } else {
                wrongAnswers.push(question.id);  // Tambahkan ID soal yang dijawab salah
                namaBtn.style.backgroundColor = 'red';
            }
        });

        setScore(finalScore);
        setIsTestEnded(true);
        setIncorrectAnswers(wrongAnswers);  // Simpan ID soal yang salah dijawab
    };

    return (
        <div className='main-container'>
            <div className='Test-Number'>
                <div className='Test-NamaDanNumber'>
                    <div className='Test-NamaPeserta'>
                        <h1>Score: {score}</h1>
                        <h1>ANDI PRIYONO</h1>
                    </div>
                    <div className='Test-Nomor'>
                        {Array.from({ length: 100 }, (_, index) => (
                            <ButtonNumber
                                key={index}
                                number={index + 1}
                                onSelect={handleQuestionSelect}
                                isAnswered={answeredQuestions.includes(index + 1)}
                                isSelected={nomorSoal === index + 1}
                                initialColor="red" // Set warna awal merah
                                id={index + 1}
                            />
                        ))}
                    </div>
                </div>
                <div className='Test-Timer-Wrapper'>
                    <div className='Test-Timer'>
                        <h1 id='timerId'>{formatTime(timeLeft)}</h1>
                    </div>
                    <button onClick={handleEndTest}>
                        Akhiri Ujian
                    </button>
                </div>
            </div>

            <div className='Test-Soal'>
                <div className='Soal-json'>
                    <h2>{nomorSoal}. {selectedQuestion}</h2>
                </div>
                <div className='box-opsi-wrapper'>
                    {selectedOptions.length > 0 && selectedOptions.map((option, index) => {
                        const optionLetter = "ABCDE"[index];
                        const isCorrectAnswer = BankSoal.questions.find(q => q.id === nomorSoal).correct_answer === optionLetter;
                        const isUserAnswer = answers[nomorSoal] === optionLetter;

                        return (
                            <div
                                key={index}
                                className={`box-opsi 
                                    ${selectedOptionIndex === index ? 'selected' : ''} 
                                    ${isUserAnswer ? 'answered' : ''}
                                    ${isTestEnded && isCorrectAnswer && !isUserAnswer ? 'correct-answer' : ''}`}
                                onClick={() => handleOptionClick(index)}
                            >
                                <h3>{option}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='Test-Option'>
                {selectedOptions.map((option, index) => (
                    <button
                        key={index}
                        className={`box-opsi ${selectedOptionIndex === index ? 'selected' : ''} 
                                    ${answers[nomorSoal] === "ABCDE"[index] ? 'answered' : ''}`}
                        onClick={() => handleOptionClick(index)}
                    >
                        <h1>{String.fromCharCode(65 + index)}</h1>
                    </button>
                ))}
            </div>

            <div className='Test-Save'>
                <button className='Test-Tombol' id='lewatkan-btn' onClick={() => handleQuestionSelect(nomorSoal + 1)}>
                    <h1>LEWATKAN</h1>
                </button>
                <button
                    className='Test-Tombol'
                    id='simpan-btn'
                    onClick={handleSave}
                    disabled={selectedOptionIndex === null}
                >
                    <h1>SIMPAN</h1>
                </button>
            </div>
        </div>
    );
};

export default TestPage;
