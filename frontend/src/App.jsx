import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Index />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
