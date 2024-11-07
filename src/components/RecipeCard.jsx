import React from "react";
import { useNavigate } from 'react-router-dom';

export function RecipeCard(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/recipe', {state: {recipeId: props.props.id}}); // Navigate to the /recipe route
    };
    

    return (
        <div className="card" onClick={handleClick} style={{cursor: 'pointer'}}>
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