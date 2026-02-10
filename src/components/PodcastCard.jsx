import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";

/**
 * PodcastCard
 *
 * Small, self-contained preview card for a podcast used inside the grid.
 * Uses a `Link` to navigate to the show's detail page so navigation is
 * accessible and can be controlled with the router.
 *
 * @component
 * @param {{podcast: Object, genres: Array<Object>}} props
 * @param {{id:string, title:string, image:string, seasons:number|string, updated:string}} props.podcast - Podcast data
 * @param {{id:number, title:string}[]} props.genres - Available genre definitions (for mapping ids)
 * @returns {JSX.Element} Podcast card element
 */
export default function PodcastCard({ podcast, genres }) {
  // Use Link for accessible navigation instead of imperative navigate

  const genreTags = podcast.genres.map((genreId) => {
    const genreInfo = genres.find((g) => g.id === genreId);
    return (
      <span key={genreId} className={styles.tag}>
        {genreInfo ? genreInfo.title : `Unknown (${genreId})`}
      </span>
    );
  });

  return (
    <Link to={`/show/${podcast.id}`} className={styles.card}>
      <img src={podcast.image} alt={podcast.title} />

      <h3>{podcast.title}</h3>
      <p className={styles.seasons}>{podcast.seasons} seasons</p>
      <div className={styles.tags}>{genreTags}</div>
      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </Link>
  );
}
