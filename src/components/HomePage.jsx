import React, { useRef, useState } from 'react';
import '../App.css';
import { getAllRecipes } from "../API.jsx";
import { RecipeTable } from './RecipeTable.jsx';

export function HomePage() {
    const inputRef = useRef(null);
    const [recipes, setRecipes] = useState([]); // store JSON recipe data
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInput = inputRef.current.value; // get the user input

        try {
            getAllRecipes(userInput).then(data => {
                setRecipes(data); // store the recipe data in recipes state
                setIsSubmitted(true);
            });
        }
        catch (error) {
            console.error("Error fetching recipes from Spoonacular:", error);
            setRecipes([]);
        }
    };

    function handleClear() {
      inputRef.current.value = "";
    }

    return (
        <div className="page-home">
            <h1 id="title">My Recipe App!</h1>
            <form onSubmit={handleSubmit}>
                <div id="search-title">
                    Simply type in the ingredients that you wish to cook with, press the [Find Recipes!] button, and select a yummy-sounding recipe!
                </div><br />
                <input id="userInput" ref={inputRef} type="text" /><br />
                <button className="btn-find" type="submit">Find Recipes!</button>
                <button className="btn-clear" onClick={handleClear}>Clear</button>
            </form>
            
            {isSubmitted && recipes.length > 0 && (
                <RecipeTable props={recipes} />
            )}
        </div>
    );
}