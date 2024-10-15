const spoonacularKey= "9cfb64406458440da2a209eb98759e78";


export async function getRecipeData(userInput) {
  var fetchExample = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userInput}&apiKey=${spoonacularKey}`;
  try {
    const response = await fetch(fetchExample);

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