import React from "react";
import { useFavorites } from "../favoritesHook.ts"; // Adjust the path accordingly

export function RecipeCard(props: any): React.JSX.Element {

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleClick = () => {
        const url: string = `/recipe?recipeId=${props.props.id}`;
        window.open(url, '_blank');
    };



    return (
        <div className="card" onClick={handleClick} style={{cursor: 'pointer'}}>
            <p className="card-name">{props.props.title}</p>

            <button
            onClick={() => toggleFavorite(recipeID)}
            style={{
              marginLeft: "10px",
              fontSize: "20px",
              cursor: "pointer",
              background: "none",
              border: "none",
              color: isFavorite(recipeID) ? "gold" : "gray"
            }}
            aria-label={isFavorite(recipeID) ? "Unfavorite" : "Favorite"}
          >
            ★
          </button>

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