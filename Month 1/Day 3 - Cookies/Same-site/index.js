const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from your frontend (replace the ngrok URL if it changes)
app.use(cors({
    origin: ["http://127.0.0.1:5500", "https://niloy-is-testing.github.io"], 
    credentials: true // Allow sending cookies
}));

app.post("/login", (req, res) => {
    const cookie = "user=hussein; samesite=strict; secure";

    res.setHeader("set-cookie", [cookie]);
    res.send("ok");
});

app.get("/img", (req, res) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        res.sendFile(`${__dirname}/cookie.png`);
    } else {
        res.sendStatus(403);
        res.end();
    }
});

app.listen(8080, () => console.log("Listening on port 8080"));
