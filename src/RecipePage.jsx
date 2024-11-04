import React, { useRef, useState } from 'react';

    // const [recipe, setRecipe] = useState();

    // const handleClick = async (event) => {
    //     event.preventDefault(); 
    
    //     try {
    //         getRecipeData(props.props.id).then(data => {
    //             setRecipe(data); // store the recipe data in recipes state
    //             useNavigate('/recipe');
    //          });
    //     }
    //     catch (error) {
    //       console.error("Error fetching recipes from Spoonacular:", error);
    //       setRecipe();
    //     }
    //   };

export function RecipePage(props) {
    return (
      <div>
        <h1>{props.title}</h1>
        <img src={props.image} alt="" />
        <h2>{props.summary}</h2>
      </div>
    );
  }