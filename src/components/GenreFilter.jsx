import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import styles from "./GenreFilter.module.css";

/**
 * GenreFilter
 *
 * Simple select control that allows the user to filter the podcast list by
 * genre. It updates the shared `PodcastContext` so the rest of the UI
 * responds automatically.
 *
 * @component
 * @param {{genres: {id:number,title:string}[]}} props - Array of genre objects
 * @returns {JSX.Element} A select dropdown bound to the genre state
 */
export default function GenreFilter({ genres }) {
  const { genre, setGenre } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    >
      <option value="all">All Genres</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.title}
        </option>
      ))}
    </select>
  );
}
