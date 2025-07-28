import { StrictMode } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ChangeCounter from './components/DecreaseCounter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/decrease" element={<ChangeCounter />} />
      </Routes>
    </Router>
  </StrictMode>,
)
