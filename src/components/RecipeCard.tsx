import React from "react";
import { useFavorites } from "../hooks/favoritesHook.ts"; 

export function RecipeCard(props: any): React.JSX.Element {
    const recipeID = props.props.id

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleClick = () => {
        const url: string = `/recipe?recipeId=${recipeID}`;
        window.open(url, '_blank');
    };



    return (
        <div className="card" onClick={handleClick} style={{cursor: 'pointer'}}>
            <button
                className="favorite-button"
                onClick={() => toggleFavorite(recipeID)}
                style={{
                  color: isFavorite(recipeID) ? "gold" : "gray"
                }}
              >
              ★
            </button>

            <p className="card-name">{props.props.title}</p>
            <img className="card-img" src={props.props.image} alt="" />
            <h3>Ingredients:</h3>
            <ul>
                {props.props.usedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                    {ingredient.original}
                </li>
                ))}
            </ul>
        </div>
    )
}