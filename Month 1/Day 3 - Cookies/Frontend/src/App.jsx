import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [cookies, setCookies] = useState({});

    // Automatically validate and refresh session at regular intervals

    useEffect(() => {
        const validateSession = async () => {
            try {
                const res = await axios.get('http://localhost:5000/validate-session', { withCredentials: true });
                console.log(res.data.message);
            } catch (error) {
                console.error("Session expired! Redirecting to login...");
            }
        };

        const interval = setInterval(validateSession, 5 * 60 * 1000); // Check every 5 minutes
        return () => clearInterval(interval);
    }, []);

    const setCookiesHandler = async () => {
        await axios.post('http://localhost:5000/set-cookies', {}, { withCredentials: true });
    };

    const getCookiesHandler = async () => {
        const res = await axios.get('http://localhost:5000/get-cookies', { withCredentials: true });
        setCookies(res.data);
    };

    const clearCookiesHandler = async () => {
        await axios.get('http://localhost:5000/clear-cookies', { withCredentials: true });
        setCookies({});
    };

    return (
        <div>
            <h1>Cookie Insights</h1>
            <button onClick={setCookiesHandler}>Set Cookies</button>
            <button onClick={getCookiesHandler}>Get Cookies</button>
            <button onClick={clearCookiesHandler}>Clear Cookies</button>
            <br />
            
            <button onClick={() => window.location.href = "https://www.example.com/"}>www.example.com</button> <br />
            <button onClick={() => window.location.href = "https://example.com/"}>example.com</button> <br />
            <h2>All Cookies</h2>

            <pre>{JSON.stringify(cookies, null, 2)}</pre>
            <br />
        </div>
    );
}

export default App;
