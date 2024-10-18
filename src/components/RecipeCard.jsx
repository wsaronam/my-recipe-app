import React from "react";
//import { useNavigate } from 'react-router-dom';
import { getRecipeData } from '../API.jsx'

export function RecipeCard(props) {
    console.log(props);
    //const navigate = useNavigate();

    const handleClick = () => {
        var recipeInfo = getRecipeData(props.props.id);
        //navigate(); // get to another page of the recipe and more of the recipe information
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