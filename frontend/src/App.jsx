import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <PrivateRoute>
            <Index />
          </PrivateRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
