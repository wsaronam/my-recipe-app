import React, { useRef, useState, useEffect } from 'react';
import { getAllRecipes, getRecipeDataList } from "../API.tsx";
import { RecipeTable } from './RecipeTable.tsx';
import { useFavorites } from "../context/favoritesContext.tsx"; 

export function HomePage(): React.JSX.Element {
    const inputRef: any | React.MutableRefObject<null> = useRef(null);
    const [recipes, setRecipes] = useState<JSON[] | any>([]); // store JSON recipe data
    const [favRecipes, setFavRecipes] = useState<JSON[] | any>([]); // store JSON favorite recipe data
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { favorites } = useFavorites();
    

    // update favorites when something is favorited/unfavorited
    useEffect(() => {
        setFavRecipes(favorites);
    }, [favorites]);


    // This section handles the search button
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInput: string = inputRef.current.value; // get the user input
        

        // STEP 1: Get the basic data from Spoonacular API
        let basicRecipeArr: any[] = [];
        try {
            await getAllRecipes(userInput).then(data => {
                basicRecipeArr = data;  // data is an arr of basic recipe objects
            });
        }
        catch (error) {
            basicRecipeArr = [];
        }
        
        // STEP 2: Use the basic data to obtain the Recipe IDs and get the full data
        const recipeIDArr: any[] = []
        for (var i = 0; i < basicRecipeArr.length; i++) {
            recipeIDArr.push(basicRecipeArr[i].id);
        }

        try {
            await getRecipeDataList(recipeIDArr).then(data => {
                setRecipes(data);  // data is now an arr of full recipe objects
                setIsSubmitted(true);
            });
        }
        catch (error) {
            console.error("Error fetching recipes from Spoonacular:", error);
            setRecipes([]);
        }
    };


    function handleClear(): void {
      inputRef.current.value = "";
    }


    return (
        <div className="page-home">
            <h1 id="title">My Recipe App!</h1>
            <form onSubmit={handleSubmit}>
                <div id="search-title">
                    Simply type in the ingredients that you wish to cook with, press the [Find Recipes!] button, and select a yummy-sounding recipe!
                </div><br />
                <div>
                    If you have multiple ingredients that you wish to include, separate those ingredients with a comma "," <br />
                    Ex: lettuce, tomatoes, onions, eggs <br /><br />
                    The system will try to find recipes with as many ingredients from the list as possible. <br />
                </div><br />
                <input id="userInput" ref={inputRef} type="text" /><br />
                <button className="btn-find" type="submit">Find Recipes!</button>
                <button className="btn-clear" onClick={handleClear}>Clear</button>
            </form>
            
            {isSubmitted && recipes.length > 0 && (
                <RecipeTable props={recipes} />
            )}

            <hr
                style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'black',
                border: 'none',
                }}
            />
            <h2 id="favorites-title">My Favorite Recipes</h2>
            {favRecipes?.length > 0 && (
                <RecipeTable props={favRecipes} />
            )}
        </div>
    );
}