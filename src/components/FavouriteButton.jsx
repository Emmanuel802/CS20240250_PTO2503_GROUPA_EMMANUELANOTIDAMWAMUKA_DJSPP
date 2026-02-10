import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import styles from "./FavouriteButton.module.css";

/**
 * FavouriteButton
 *
 * A heart icon button that allows users to favourite/unfavourite an episode.
 * Shows a filled heart when favourited, empty heart when not.
 *
 * @component
 * @param {{episode: Object, showTitle: string, seasonNumber: number}} props
 * @returns {JSX.Element} Favourite button with heart icon
 */
export default function FavouriteButton({ episode, showTitle, seasonNumber }) {
  const { isFavourited, toggleFavourite } = useContext(FavouritesContext);
  const isLiked = isFavourited(showTitle, seasonNumber, episode.title);

  const handleClick = () => {
    toggleFavourite(episode, showTitle, seasonNumber);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.heartBtn} ${isLiked ? styles.liked : ""}`}
      aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
      title={isLiked ? "Remove from favourites" : "Add to favourites"}
    >
      {isLiked ? "❤️" : "🤍"}
    </button>
  );
}
