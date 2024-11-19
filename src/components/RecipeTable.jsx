import { RecipeCard } from "./RecipeCard.jsx";

export function RecipeTable(props) {
    return (
        <section className="cards-list">
            {props.props.map(recipe => {
                return <RecipeCard props={recipe} />;
            })}
        </section>
    );
}