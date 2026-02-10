import PodcastCard from "./PodcastCard";
import { PodcastContext } from "../context/PodcastContext";
import styles from "./PodcastGrid.module.css";
import { useContext } from "react";

/**
 * PodcastGrid
 *
 * Renders the list of podcasts provided by `PodcastContext` as a responsive
 * grid of `PodcastCard` components. If there are no podcasts after filters,
 * a user-friendly message is shown.
 *
 * @component
 * @param {{genres: {id:number,title:string}[]}} props - Genre definitions passed to cards
 * @returns {JSX.Element} Grid of podcast cards or a 'no results' message
 */
export default function PodcastGrid({ genres }) {
  const { podcasts } = useContext(PodcastContext);
  if (!podcasts.length) {
    return (
      <p className={styles.noResults}>
        No podcasts match your search or filters.
      </p>
    );
  }
  return (
    <div className={styles.grid}>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} genres={genres} />
      ))}
    </div>
  );
}
