import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecipePage } from './components/RecipePage.tsx';
import { HomePage } from './components/HomePage.tsx';

export default function App(): React.JSX.Element {
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