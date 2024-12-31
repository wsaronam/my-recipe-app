import React from "react";
import { RecipeCard } from "./RecipeCard.tsx";

export function RecipeTable(props: any): React.JSX.Element {
    console.log(props.props);
    return (
        <section className="cards-list">
            {props.props.map(recipe => {
                return <RecipeCard props={recipe} />;
            })}
        </section>
    );
}