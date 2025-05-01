import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // You forgot this!
import './registerBoard.css';

function RegisterBoard() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // TODO: FIX THE 5001 ISSUE (make dynamic to env variable)
        try {
            const response = await fetch('http://localhost:5001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                setError('');

                // Optionally wait a bit before redirecting
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                setError(data.message);
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registerBoard">
            <div className="registerBoardContainer">
                <h1 className="registerBoardTitle">Register</h1>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="registerBoardForm">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleRegister} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <p>Already have an account?</p>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterBoard;
