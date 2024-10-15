import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { getRecipeData } from "./API.jsx"
import { RecipeTable } from './components/RecipeTable.jsx';







export default function App() {
  const inputRef = useRef(null);
  const [recipes, setRecipes] = useState([]); // store JSON recipe data

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const userInput = inputRef.current.value; // get the user input

    try {
      getRecipeData(userInput).then(data => {
        setRecipes(data); // store the recipe data in recipes state
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
        {recipes.length > 0 && (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}