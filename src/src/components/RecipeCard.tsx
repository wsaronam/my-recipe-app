import React from "react";
import { useFavorites } from "../hooks/favoritesHook.ts"; 

export function RecipeCard(props: any): React.JSX.Element {
    const recipe = props.props
    const recipeID = recipe.id

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleClick = () => {
        const url: string = `/recipe?recipeId=${recipeID}`;
        window.open(url, '_blank');
    };



    return (
        <div className="card" style={{cursor: 'pointer'}}>
            <button
                className="favorite-button"
                onClick={() => toggleFavorite(recipe)}
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