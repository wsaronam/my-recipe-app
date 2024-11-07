import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipeData } from '../API.jsx';

    

export function RecipePage() {
  const location = useLocation();
  const { recipeId } = location.state || {};

  const [recipe, setRecipe] = useState();

  // fetch data when component mounts or recipeId changes
  useEffect(() => {
    if (!recipeId) {
      console.error("No recipeId provided");
      return; // exit if there's no recipeId
    }

    const fetchData = async () => {
      try {
        const data = await getRecipeData(recipeId);
        console.log(data);
        setRecipe(data);  // store recipe data in state
      } 
      catch (error) {
        console.error("Error fetching recipe data:", error);
        setRecipe(null);  // no data if error
      }
    };

    fetchData();

  }, [recipeId]);  // rerun only id recipeId changes
  

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt="" />
      <p>{recipe.summary}</p>
      <p>{recipe.instructions}</p>
      <p>
        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
          Click here to see the original recipe page!
        </a>
      </p>
    </div>
  );
}