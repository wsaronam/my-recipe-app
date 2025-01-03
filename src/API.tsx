const spoonacularKey = "9cfb64406458440da2a209eb98759e78";

export async function getAllRecipes(userInput: string): Promise<any> {
    /*
    Grabs a list of recipes including the inputted ingredients
    */
    var getAllRecipesString: string = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(userInput)}&apiKey=${spoonacularKey}`;
    try {
        const response: Response = await fetch(getAllRecipesString);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const jsonData: JSON | [] = await response.json();
        return jsonData || [];  // return the json data or if there is no data, empty array
    } 

    catch (error) {
        console.error(error.message);
        return [];  // return empty array again if there is error
    }
}

export async function getRecipeData(recipeID: string) {
    /*
    Gets more detailed information about the recipe selected using the recipe ID
    */
    var getRecipeInfoString: string = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`;
    try {
        const response: Response = await fetch(getRecipeInfoString);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const jsonData: JSON | [] = await response.json();
        return jsonData || [];  // return the json data or if there is no data, empty array
    } 

    catch (error) {
        console.error(error.message);
        return [];  // return empty array again if there is error
    }
}

export async function getRecipeDataList(recipeIDArr: string[]) {
    /*
    Takes a list of recipe IDs and and returns a list of all the recipes
    CURRENTLY USES TOO MANY API CALLS.  NEED TO REDUCE THIS.
    */
    const idString = recipeIDArr.join(',');
    var getRecipeInfoString: string = `https://api.spoonacular.com/recipes/informationBulk?ids=${idString}&apiKey=${spoonacularKey}`
    try {
        const response: Response = await fetch(getRecipeInfoString);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const jsonData: JSON | [] = await response.json();
        return jsonData || [];  // return the json data or if there is no data, empty array
    } 

    catch (error) {
        console.error(error.message);
        return [];  // return empty array again if there is error
    }
}