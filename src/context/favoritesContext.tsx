import React from "react";
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";


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
    const addFavorite = useCallback((recipe: any) => {
        setFavorites((prev) => [...prev, recipe]);
        return favorites;
    }, []);

    const removeFavorite = useCallback((recipe: any) => {
        setFavorites((prev) => prev.filter((favRecipe) => favRecipe.id !== recipe.id));
        return favorites;
    }, []);

    const isFavorite = useCallback((recipe: any) => {
        return favorites.some((favRecipe) => favRecipe.id === recipe.id);
    }, [favorites]);

    const toggleFavorite = useCallback((recipe: any) => {
        return isFavorite(recipe) ? removeFavorite(recipe) : addFavorite(recipe);
    }, [isFavorite, addFavorite, removeFavorite]);



    const contextValue: any = useMemo(() => ({ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }), [favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite]);

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
    
