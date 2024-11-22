import React from "react";

export function RecipeCard(props: any): React.JSX.Element {

    const handleClick = () => {
        const url: string = `/recipe?recipeId=${props.props.id}`;
        window.open(url, '_blank');
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