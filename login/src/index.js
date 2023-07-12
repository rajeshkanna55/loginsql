import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './registration';
import Login from './login';
import Dashboard from './dashboard';
import Profile from './profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <Routes>
  <Route path="/" element={<App />}></Route>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path='/dashboard' element={<Dashboard/>}></Route>
  <Route path='/profile' element={<Profile/>}></Route>
</Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
