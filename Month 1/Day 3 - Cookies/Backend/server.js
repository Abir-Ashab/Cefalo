const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Set different types of cookies
app.post('/set-cookies', (req, res) => {
    res.cookie('sessionCookie', 'sessionData', { maxAge: 1000 * 60 * 10 }); // 10 min session cookie
    res.cookie('permanentCookie', 'permanentData', { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days
    res.cookie('httpOnlyCookie', 'secureData', { httpOnly: true });
    res.cookie('secureCookie', 'encryptedData', { secure: true });
    res.cookie('sameSiteCookie', 'sameSiteData', { sameSite: 'Strict' });
    res.send('Cookies Set!');
});

app.get('/validate-session', (req, res) => {
    const sessionCookie = req.cookies.sessionCookie;
    
    if (!sessionCookie) {
        return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    // Refresh the session cookie by resetting its expiration
    res.cookie('sessionCookie', 'sessionData', { maxAge: 1000 * 60 * 10 }); // Extend for another 10 minutes
    res.json({ message: "Session refreshed!", sessionCookie });
});

// Read cookies
app.get('/get-cookies', (req, res) => {
    res.json(req.cookies);
});

// Path-specific cookies
app.get('/path1', (req, res) => {
    res.cookie('pathCookie', 'path1-data', { path: '/path1' });
    res.json("You are exploring path1");
});
app.get('/path2', (req, res) => {
    res.cookie('pathCookie', 'path2-data', { path: '/path2' });
    res.json("You are exploring path2");
});

// Clear cookies
app.get('/clear-cookies', (req, res) => {
    res.clearCookie('sessionCookie');
    res.clearCookie('permanentCookie');
    res.send('Cookies Cleared!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
