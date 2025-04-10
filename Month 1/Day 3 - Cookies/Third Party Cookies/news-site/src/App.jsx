import { useEffect } from "react";

function App() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "http://localhost:4000/ad.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <h1>News Website</h1>
            <p>Welcome to the latest news updates.</p>
            <div id="ad-container"></div>
        </div>
    );
}

export default App;
