import React, { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';
import { getRecipeData } from '../API.tsx';
import { useFavorites } from "../hooks/favoritesHook.ts"; 

export function RecipePage(): React.JSX.Element {
    const location: Location<any> = useLocation();
  
    // Extract the recipeId from the query string
    const queryParams: URLSearchParams = new URLSearchParams(location.search);  // Parse query parameters
    const recipeId: string | any = queryParams.get('recipeId');  // Get the recipeId parameter from the query string

    const [recipe, setRecipe] = useState<JSON | any>(null);

    const { isFavorite, toggleFavorite } = useFavorites();

    // Fetch data when component mounts or recipeId changes
    useEffect(() => {
        if (!recipeId) {
            console.error("No recipeId provided");
            return; // exit if there's no recipeId
        }

        const fetchData = async () => {
            try {
                const data: JSON | never[] = await getRecipeData(recipeId);
                setRecipe(data);  // store recipe data in state
            } 
            catch (error) {
                console.error("Error fetching recipe data:", error);
                setRecipe(null);  // no data if error
            }
        };

        fetchData();

    }, [recipeId]);  // rerun only if recipeId changes

    // Show loading state while recipe is null
    if (!recipe) {
        return <div>Loading...</div>;  // This will show until recipe data is loaded
    }

    return (
        <div className="page-recipe">
            <button
              className="favorite-button"
              onClick={() => toggleFavorite(recipe)}
              style={{
                color: isFavorite(recipe) ? "gold" : "dimgray",
                fontSize: "80px",
                marginLeft: "-20px",
                border: "none"
              }}
            >
                ★
            </button>

            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt="" />
            <ul>
                {recipe.extendedIngredients.map(item => (
                    <li>{item.original}</li>
                ))}
            </ul>
            <p><b>Preparation time: {recipe.readyInMinutes} minutes</b></p><br />
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            <p>{recipe.instructions}</p>
            <p>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                    Click here to see the original recipe page!
                </a>
            </p>
        </div>
    );
}