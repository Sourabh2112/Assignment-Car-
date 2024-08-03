import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Options from './components/Options';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import AdminHomePage from './components/AdminHomePage';
import UserHomePage from './components/UserHomePage';
import Navbar from './components/Navbar';
import AboutPage from './components/About-page';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Options />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccountPage />} />
          <Route path="/api/admin" element={<AdminHomePage />} />
          <Route path="/api/user" element={<UserHomePage />} />
          <Route path="/About-page" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;