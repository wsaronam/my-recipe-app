import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RecipePage } from './components/RecipePage.jsx';
import { HomePage } from './components/HomePage.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe" element={<RecipePage />} />
            </Routes>
        </BrowserRouter>
    );
}