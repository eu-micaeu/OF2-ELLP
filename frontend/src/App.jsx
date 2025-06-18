import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './pages/Index/Index';
// import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Index />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
