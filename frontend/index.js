const spoonacularKey = "9cfb64406458440da2a209eb98759e78";

var userInput = document.getElementById("userInput").value;

var fetchExample = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userInput}&apiKey=${spoonacularKey}";


function testFunc() {
    fetch(fetchExample).then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
      }).catch(err => {
        // Do something for an error here
      });
}
