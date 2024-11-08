import { RecipeCard } from "./RecipeCard.jsx";

export function RecipeTable(props) {
    console.log(props.props);

    return (
        <section className="cards-list">
            {props.props.map(recipe => {
                console.log(recipe);
                return <RecipeCard props={recipe} />;
            })}
        </section>
    );
}