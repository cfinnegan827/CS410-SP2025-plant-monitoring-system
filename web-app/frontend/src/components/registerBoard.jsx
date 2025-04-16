import React, { useState } from 'react';
import './registerBoard.css';

function RegisterBoard() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading

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
                // Successfully registered
                alert('Registration successful!');
                navigate('/login');
                // Optionally, save user data to state or redirect to login page
            } else {
                // Show error message
                setError(data.message);
            }
        } catch (err) {
            // Handle any unexpected errors (like network issues)
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="registerBoard">
            <div className="registerBoardContainer">
                <h1 className="registerBoardTitle">Register</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="registerBoardForm">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
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