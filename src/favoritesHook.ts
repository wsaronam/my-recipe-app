import { useState, useEffect } from "react";


export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);  // store user favorite recipes locally

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        const parsedFavorites: string[] = savedFavorites ? JSON.parse(savedFavorites) : [];
        setFavorites(parsedFavorites);
    }, []);

    // Save favorites to localStorage on change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    

    // Connect these to buttons on recipes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const addFavorite = (recipeID: string) => {
        setFavorites((prev) => [...prev, recipeID]);
    };

    const removeFavorite = (recipeID: string) => {
        setFavorites((prev) => prev.filter((id) => id !== recipeID));
    };

    const isFavorite = (recipeID: string) => {
        return (favorites.includes(recipeID));
    }

    const toggleFavorite = (recipeID: string) => {
        if (favorites.includes(recipeID)) {
          removeFavorite(recipeID); // Call remove function
        } 
        else {
          addFavorite(recipeID); // Call add function
        }
    };
    // Connect these to buttons on recipes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    
    return {
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
    };
};