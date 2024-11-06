import React, { useState } from 'react';
import './cssGroup/LoginPage.css';

const LoginPage = () => {
    // State untuk menyimpan input nama, password, dan pesan kesalahan
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fungsi untuk menangani perubahan input nama
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Fungsi untuk menangani perubahan input password
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Fungsi untuk menangani pengiriman form
    const handleLogin = (e) => {
        e.preventDefault();

        // Validasi login
        if (name === 'budi' && password === '1234') {
            setErrorMessage('benar');  // Kosongkan pesan error jika login berhasil
            // Lakukan tindakan jika login berhasil, seperti redirect ke halaman lain
        } else {
            setErrorMessage('Gagal login, coba lagi');
        }
    };

    return (
        <div className='main-container'>
            <div className="outer-box">
                <div className='bkn-cat-logo'>
                    <img src='./image/bks.png' alt='Logo'></img>
                </div>
                <div className='GagalLogin'>
                    <h1 id='GagalLogin'>{errorMessage}</h1>
                </div>
                <div className="container">
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="name">Nama:</label>
                            <input
                                className='inputan'
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                className='inputan'
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button className="form-btn" type="submit" id='login-btn'>
                                Login
                            </button>
                            <button className="form-btn" id='register-btn'>
                                Daftar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
