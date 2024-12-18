import { useState, useEffect } from "react";


export const useFavorites = () => {
    const [favorites, setFavorites] = useState<any[]>([]);  // store user favorite recipes locally.  This will be an array of Recipe objects

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        const parsedFavorites: any[] = savedFavorites ? JSON.parse(savedFavorites) : [];
        setFavorites(parsedFavorites);
    }, []);

    // Save favorites to localStorage on change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("Dispatching favoritesUpdated event");
        window.dispatchEvent(new Event("favoritesUpdated")); // notifies favorites state change
    }, [favorites]);

    // listen for favorites updates
    useEffect(() => {
        const handleFavoritesUpdate = () => {
            console.log("Received favoritesUpdated event");
            const updatedFavorites = localStorage.getItem("favorites");
            const parsedFavorites = updatedFavorites ? JSON.parse(updatedFavorites) : [];

            // only update favorites if something changes
            if (JSON.stringify(parsedFavorites) !== JSON.stringify(favorites)) {
                setFavorites(parsedFavorites);
            }
        };

        window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
        console.log("added listener");

        return () => {
            window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
            console.log("removed listeneer")
        };
    }, [favorites]);
    

    // Connect these to buttons on recipes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const addFavorite = (recipe: any) => {
        setFavorites((prev) => [...prev, recipe]);
        console.log("Added:", recipe);
    };

    const removeFavorite = (recipe: any) => {
        setFavorites((prev) => prev.filter((favRecipe) => favRecipe.id !== recipe.id));
        console.log("Removed:", recipe);
    };

    const isFavorite = (recipe: any) => {
        return favorites.some((favRecipe) => favRecipe.id === recipe.id);
    }

    const toggleFavorite = (recipe: any) => {
        if (favorites.some((favRecipe) => favRecipe.id === recipe.id)) {
          removeFavorite(recipe); // Call remove function
        } 
        else {
          addFavorite(recipe); // Call add function
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