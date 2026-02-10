/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import React, { createContext, useState, useEffect } from "react";

/**
 * FavouritesContext - Manages user's favourite episodes
 * Stores favourites in localStorage so they persist across sessions
 */
export const FavouritesContext = createContext();

/**
 * FavouritesProvider - Wraps the app and provides favourites functionality
 * Loads saved favourites from localStorage on mount
 *
 * @param {{children: React.ReactNode}} props
 * @returns {JSX.Element}
 */
export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavourites = localStorage.getItem("podcast-favourites");
      if (savedFavourites) {
        setFavourites(JSON.parse(savedFavourites));
      }
    } catch (error) {
      console.error("Error loading favourites:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("podcast-favourites", JSON.stringify(favourites));
      } catch (error) {
        console.error("Error saving favourites:", error);
      }
    }
  }, [favourites, isLoaded]);

  /**
   * Add an episode to favourites
   * @param {Object} episode - Episode object with title, description, audio, etc.
   * @param {string} showTitle - Title of the parent show
   * @param {number} seasonNumber - Season number
   */
  const addFavourite = (episode, showTitle, seasonNumber) => {
    const newFavourite = {
      id: `${showTitle}-${seasonNumber}-${episode.title}`,
      ...episode,
      showTitle,
      seasonNumber,
      addedDate: new Date().toISOString(),
    };

    // Check if already in favourites
    if (
      !favourites.some(
        (fav) =>
          fav.showTitle === showTitle &&
          fav.seasonNumber === seasonNumber &&
          fav.title === episode.title,
      )
    ) {
      setFavourites([...favourites, newFavourite]);
    }
  };

  /**
   * Remove an episode from favourites
   * @param {string} id - Unique identifier for the favourite
   */
  const removeFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  /**
   * Check if an episode is in favourites
   * @param {string} showTitle
   * @param {number} seasonNumber
   * @param {string} episodeTitle
   * @returns {boolean}
   */
  const isFavourited = (showTitle, seasonNumber, episodeTitle) => {
    return favourites.some(
      (fav) =>
        fav.showTitle === showTitle &&
        fav.seasonNumber === seasonNumber &&
        fav.title === episodeTitle,
    );
  };

  /**
   * Toggle favourite status of an episode
   */
  const toggleFavourite = (episode, showTitle, seasonNumber) => {
    if (isFavourited(showTitle, seasonNumber, episode.title)) {
      const id = `${showTitle}-${seasonNumber}-${episode.title}`;
      removeFavourite(id);
    } else {
      addFavourite(episode, showTitle, seasonNumber);
    }
  };

  const contextValue = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourited,
    toggleFavourite,
    favouriteCount: favourites.length,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
}
