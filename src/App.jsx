import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RecipePage } from './components/RecipePage.jsx';
import { HomePage } from './components/HomePage.jsx';

export default function App() {
    useEffect(() => {
        document.title = "Recipe App";
      }, []); // The empty dependency array ensures this runs only once.

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe" element={<RecipePage />} />
            </Routes>
        </BrowserRouter>
    );
}