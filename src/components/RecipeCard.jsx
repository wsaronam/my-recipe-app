import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import { getRecipeData } from '../API.jsx'

export function RecipeCard(props) {
    const [recipe, setRecipe] = useState();

    const handleClick = async (event) => {
        event.preventDefault(); 
    
        try {
            getRecipeData(props.props.id).then(data => {
                setRecipe(data); // store the recipe data in recipes state
                console.log(data);  // DELETE THIS LATER
             });
        }
        catch (error) {
          console.error("Error fetching recipes from Spoonacular:", error);
          setRecipe();
        }
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