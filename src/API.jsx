const spoonacularKey = "9cfb64406458440da2a209eb98759e78";

export async function getAllRecipes(userInput) {
    /*
    Grabs a list of recipes including the inputted ingredients
    */
    var getAllRecipesString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userInput}&apiKey=${spoonacularKey}`;
    try {
        const response = await fetch(getAllRecipesString);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData || [];  // return the json data or if there is no data, empty array
    } 

    catch (error) {
        console.error(error.message);
        return [];  // return empty array again if there is error
    }
}

export async function getRecipeData(recipeID) {
    /*
    Gets more detailed information about the recipe selected using the recipe ID
    */
    var getRecipeInfoString = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`;
    try {
        const response = await fetch(getRecipeInfoString);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData || [];  // return the json data or if there is no data, empty array
    } 

    catch (error) {
        console.error(error.message);
        return [];  // return empty array again if there is error
    }
}