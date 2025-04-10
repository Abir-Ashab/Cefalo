const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Route to set a third-party tracking cookie
app.get("/track", (req, res) => {
    let visits = req.cookies.visits ? JSON.parse(req.cookies.visits) : [];
    
    const currentSite = req.query.site;
    if (!visits.includes(currentSite)) {
        visits.push(currentSite);
    }

    res.cookie("visits", JSON.stringify(visits), {
        domain: "localhost", // Simulating a real domain
        path: "/",
        httpOnly: false,
        secure: false,
        sameSite: "None",
    });

    res.json({ message: "Tracking cookie set", visits });
});

// Route to serve an ad with tracking script
app.get("/ad.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.send(`
        fetch("http://localhost:4000/track?site=" + window.location.hostname, { credentials: "include" })
            .then(response => response.json())
            .then(data => console.log("User has visited:", data.visits))
            .catch(error => console.error("Tracking error:", error));

        document.write('<div style="border:2px solid black;padding:10px;width:300px;text-align:center;">');
        document.write('<p>Ad from adsprovider.com</p>');
        document.write('</div>');
    `);
});

app.listen(4000, () => {
    console.log("Ad provider running on http://localhost:4000");
});
