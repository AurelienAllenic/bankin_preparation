import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './components/Dashboard/CreatePost';
import OnePost from './components/Dashboard/OnePost';

function App() {

  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route exact path="/one-post/:id" element={<PrivateRoute><OnePost /></PrivateRoute>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
