import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './pages/Index/Index';
import Home from './pages/Home/Home';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
