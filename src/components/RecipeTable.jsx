export function RecipeTable({ recipes }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.title}</td>
              <td>{recipe.usedIngredients.join(', ')}</td>
              <td>{recipe.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }