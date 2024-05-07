import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPopulation from './Pages/BooksPopulation'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import Library from './Pages/library'
import CommunityPage from './Pages/CommunityPage';
import Community2 from './Pages/Community2';
import Community3 from './Pages/Community3';
import Community4 from './Pages/Community4';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/BooksPopulation" element={<BooksPopulation/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/CommunityPage" element={<CommunityPage/>} />
        <Route path="/Community2" element={<Community2/>} />
        <Route path="/Community3" element={<Community3/>} />
        <Route path="/Community4" element={<Community4/>} />
        <Route path="/Home/:userId/:username" element={<Home/>} />
        <Route path="/Library/:userId/:username" element={<Library/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
