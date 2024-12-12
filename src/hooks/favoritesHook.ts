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
        window.dispatchEvent(new Event("favoritesUpdated")); // notifies favorites state change
    }, [favorites]);

    // listen for favorites updates
    useEffect(() => {
        const handleFavoritesUpdate = () => {
            const updatedFavorites = localStorage.getItem("favorites");
            console.log(favorites);
            const parsedFavorites = updatedFavorites ? JSON.parse(updatedFavorites) : [];

            // only update favorites if something changes
            if (JSON.stringify(parsedFavorites) !== JSON.stringify(favorites)) {
                setFavorites(parsedFavorites);
            }
        };

        window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

        return () => {
            window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
        };
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