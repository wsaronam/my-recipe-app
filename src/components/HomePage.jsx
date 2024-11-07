import React, { useRef, useState } from 'react';
import '../App.css';
import { getAllRecipes } from "../API.jsx"
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

  return (
    <div>
      <h1>My Recipe App!</h1>
        <form onSubmit={handleSubmit}>
            Recipe Search<br />
            <input id="userInput" ref={inputRef} type="text" /><br />
            <button type="submit">Find recipes!</button>
        </form>
        
        {isSubmitted && recipes.length > 0 && (
          <RecipeTable props={recipes} />
        )}
    </div>
  );
}