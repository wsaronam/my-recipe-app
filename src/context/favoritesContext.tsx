/* import { useState, useEffect, useRef } from "react";


let isListenerSetup = false;  // check if listener is already setup to avoid multiple listener issue

export const useFavorites = () => {
    console.log("useFavorites called");
    const [favorites, setFavorites] = useState<any[]>([]);  // store user favorite recipes locally.  This will be an array of Recipe objects
    const favoritesChangedLocally = useRef(false);  // this will stop the dispatch/receive infinite loops

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        const parsedFavorites: any[] = savedFavorites ? JSON.parse(savedFavorites) : [];
        setFavorites(parsedFavorites);
    }, []);

    // Save favorites to localStorage on change
    useEffect(() => {
        if (favoritesChangedLocally.current) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
            console.log("Dispatching favoritesUpdated event");
            window.dispatchEvent(new Event("favoritesUpdated")); // notifies favorites state change
            favoritesChangedLocally.current = false;
        }
    }, [favorites]);

    // listen for favorites updates
    useEffect(() => {
        if (!isListenerSetup) {
            isListenerSetup = true;
            console.log("setting up listener for favoritesUpdated event");
            
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
                console.log("removing listener");
                window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
                console.log("removed listeneer")
            };
        }
    }, []);
    

    // favorites adding/removing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const addFavorite = (recipe: any) => {
        favoritesChangedLocally.current = true;
        setFavorites((prev) => [...prev, recipe]);
        console.log("Added:", recipe);
    };

    const removeFavorite = (recipe: any) => {
        favoritesChangedLocally.current = true;
        setFavorites((prev) => prev.filter((favRecipe) => favRecipe.id !== recipe.id));
        console.log("Removed:", recipe);
    };

    const isFavorite = (recipe: any) => {
        return favorites.some((favRecipe) => favRecipe.id === recipe.id);
    }

    const toggleFavorite = (recipe: any) => {  // THIS IS THE ONLY FUNCTION THAT SHOULD BE USED OUTSIDE OF THE HOOK.
        if (isFavorite(recipe)) {
          removeFavorite(recipe); 
        } 
        else {
          addFavorite(recipe);
        }
    };
    // favorites adding/removing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    
    return {
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
    };
}; */



import React from "react";
import { createContext, useContext, useState, useEffect, useMemo } from "react";


const FavoritesContext = createContext<any | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
    const [favorites, setFavorites] = useState<any[]>(() => {  // load on startup initial
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites): [];
    });

    // save favorites to localStorage when favorites changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);



    // functions for adding/removing/checking favorites ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const addFavorite = (recipe: any) => {
        setFavorites((prev) => [...prev, recipe]);
    };

    const removeFavorite = (recipe: any) => {
        setFavorites((prev) => prev.filter((favRecipe) => favRecipe.id !== recipe.id));
    };

    const isFavorite = (recipe: any) => {
        return favorites.some((favRecipe) => favRecipe.id == recipe.id);
    };

    const toggleFavorite = (recipe: any) => {
        isFavorite(recipe) ? removeFavorite(recipe) : addFavorite(recipe);
    };



    const contextValue: any = useMemo(() => ({ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }), [favorites]);

    return (
        <FavoritesContext.Provider value={ contextValue }>
            {children}
        </FavoritesContext.Provider>
    );
};



export const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites has to be used in FavoritesProvider");
    }

    return context;
}
    
