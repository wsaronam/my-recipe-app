const spoonacularKey= "9cfb64406458440da2a209eb98759e78";
var userInput = document.getElementById("userInput").value;
var fetchExample = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userInput}&apiKey=${spoonacularKey}";


function testFunc() {
  console.log("we are here!")
    fetch(fetchExample).then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
      }).catch(err => {
        // Do something for an error here
      });
}


async function getData() {
  console.log("we are here!")
  try {
    const response = await fetch(fetchExample);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}