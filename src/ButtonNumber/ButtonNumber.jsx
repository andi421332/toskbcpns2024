import React from 'react';
import './../cssGroup/btnNumber.css'



const ButtonNumber = ({ number, id, onSelect, isAnswered, isSelected, initialColor = 'red' }) => {
    const buttonStyle = {
        backgroundColor: isAnswered ? 'green' : initialColor, // Merah awal, hijau jika terjawab
        border: isSelected ? '2px solid blue' : '1px solid black' // Indikator jika dipilih
    };

    return (
        <button
            className='button-number'
            id={id}
            onClick={() => onSelect(number)}
            style={buttonStyle}
        >
            {number}
        </button>
    );
};

export default ButtonNumber;

