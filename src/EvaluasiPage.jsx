import React, { useState, useEffect } from 'react';
import './cssGroup/EvaluasiPage.css';
import ButtonNumber from './ButtonNumber/ButtonNumber';
import BankSoal from './BankSoal.json';

const EvaluasiPage = () => {
    const tempquestion = BankSoal.questions.find(q => q.id === 1);
    const [selectedQuestion, setSelectedQuestion] = useState(tempquestion.question);
    const [selectedOptions, setSelectedOptions] = useState(tempquestion.options);
    const [nomorSoal, setNomorSoal] = useState(1);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Track selected option index
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions

    // Function to select question based on number
    const handleQuestionSelect = (number) => {
        const question = BankSoal.questions.find(q => q.id === number);
        if (question) {
            setNomorSoal(number);
            setSelectedQuestion(question.question);
            setSelectedOptions(question.options);

            // Reset selected option when selecting a new question
            setSelectedOptionIndex(null); // No option selected
        }
    };


  
    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index); // Set selected option index
    };

    const handleSkip = () => {
        if (nomorSoal < 100) {
            const nextQuestion = nomorSoal + 1;
            handleQuestionSelect(nextQuestion);
        }
    };

    // Fungsi untuk menangani tombol simpan
 

    return (
        <div className='main-container'>
            <div className='Test-Number'>
                <div className='Test-NamaDanNumber'>
                    <div className='Test-NamaPeserta'>
                        <h1>ANDI PRIYONO</h1>
                    </div>
                    <div className='Test-Nomor'>
                        {Array.from({ length: 100 }, (_, index) => (
                            <ButtonNumber
                                key={index}
                                number={index + 1}
                                onSelect={handleQuestionSelect}
                                isAnswered={answeredQuestions.includes(index + 1)} // Cek apakah soal sudah dijawab
                                isSelected={nomorSoal === index + 1} // Cek apakah soal ini sedang dipilih
                            />
                        ))}
                    </div>
                </div>
                
            </div>

            <div className='Test-Soal'>
                <div className='Soal-json'>
                    <h2>{nomorSoal}. {selectedQuestion}</h2>
                </div>
                <div className='box-opsi-wrapper'>
                    {selectedOptions.length > 0 && selectedOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`box-opsi ${selectedOptionIndex === index ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(index)} // Handle click on box-opsi
                        >
                            <h3>{option}</h3>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default EvaluasiPage;
