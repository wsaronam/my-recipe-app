import React, { useEffect, useState } from "react";
import { getRecipeData } from '../API.tsx';
import { useFavorites } from "../context/favoritesContext.tsx"; 

export function RecipeCard(props: any): React.JSX.Element {
    const recipe = props.props
    const recipeID = recipe.id

    const [fullRecipe, setFullRecipe] = useState<JSON | any>(null);

    const { favorites, isFavorite, toggleFavorite } = useFavorites();

    // temp for debugging favorites
        useEffect(() => {
            console.log("this component's favorites:", favorites);
        }, [favorites]);

    const handleClick = () => {
        const url: string = `/recipe?recipeId=${recipeID}`;
        window.open(url, '_blank');
    };

    // I BELIEVE THE ISSUE LIES IN THE RECIPES BEING SAVED.  RECIPCARD IS SAVING A SIMPLER VERSION OF RECIPE WHILE RECIPEPAGE IS SAVING THE FULL.  
    // TODO:  MAKE THE FILES SAVE THE SAME RECIPE (EITHER SIMPLE OR FULL)
    
    // Fetch data when component mounts or recipeId changes
    useEffect(() => {
        if (!recipeID) {
            console.error("No recipeId provided");
            return; // exit if there's no recipeId
        }

        const fetchData = async () => {
            try {
                const data: JSON | never[] = await getRecipeData(recipeID);
                setFullRecipe(data);  // store recipe data in state
            } 
            catch (error) {
                console.error("Error fetching recipe data:", error);
                setFullRecipe(null);  // no data if error
            }
        };

        fetchData();

    }, []);  // rerun only if recipeId changes



    return (
        <div className="card" style={{cursor: 'pointer'}}>
            <button
                className="favorite-button"
                onClick={() => toggleFavorite(fullRecipe)}
                style={{
                    color: isFavorite(recipe) ? "gold" : "dimgray",
                    border: "solid",
                    borderRadius: "22px",
                }}
              >
              ★
            </button>

            <div onClick={handleClick}>
                <p className="card-name">{recipe.title}</p>
                <img className="card-img" src={recipe.image} alt="" />
                <h3>Ingredients:</h3>
                <ul>
                    {recipe.usedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.original}
                    </li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}