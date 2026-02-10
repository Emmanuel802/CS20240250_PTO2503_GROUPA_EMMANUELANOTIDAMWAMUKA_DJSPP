import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import FavouriteButton from "./FavouriteButton";
import styles from "./EpisodeList.module.css";
import {
  shortenDescription,
  ensureHasAudioOrAlert,
} from "../utils/episodeUtils";

/**
 * EpisodeList
 *
 * Renders the episodes for a single season. Each list item shows the
 * episode number, title, a short description (truncated for readability),
 * and an image when available. Includes a play button to start playback.
 *
 * @component
 * @param {{episodes: Array<Object>, seasonImage?: string, showTitle?: string, seasonNumber?: number}} props
 * @param {Array<Object>} props.episodes - Episodes to render
 * @param {string} [props.seasonImage] - Optional fallback image for episodes
 * @param {string} [props.showTitle] - Title of the parent show
 * @param {number} [props.seasonNumber] - Season number for favouriting
 * @returns {JSX.Element} Episode list UI
 */
export default function EpisodeList({
  episodes,
  seasonImage,
  showTitle = "Podcast",
  seasonNumber = 1,
}) {
  const { playEpisode, currentEpisode } = useContext(AudioContext);

  /**
   * Shortens episode description to a maximum of 150 characters
   *
   * @param {string} description - The full episode description
   * @param {number} maxLength - Maximum characters to show (default: 150)
   * @returns {string} Shortened description with ellipsis if truncated
   */
  // description helper is imported from utils/episodeUtils

  /**
   * Handle play button click
   * Audio comes from API: show.seasons[].episodes[].file
   */
  const handlePlayClick = (episode) => {
    // Validate episode has audio from the API before attempting playback
    if (!ensureHasAudioOrAlert(episode)) return;

    // Pass full episode object to AudioContext; AudioContext will use episode.file
    playEpisode({ ...episode, showTitle });
  };

  return (
    <div className={styles.episodeListContainer}>
      {episodes && episodes.length > 0 ? (
        <ul className={styles.episodeList}>
          {episodes.map((episode, index) => {
            const episodeNumber = index + 1;
            const isCurrentlyPlaying = currentEpisode?.title === episode.title;

            return (
              <li key={episodeNumber} className={styles.episodeItem}>
                <div className={styles.episodeContent}>
                  <div className={styles.episodeHeader}>
                    <span className={styles.episodeNumber}>
                      Episode {episodeNumber}
                    </span>
                    <h4 className={styles.episodeTitle}>{episode.title}</h4>
                  </div>

                  <p className={styles.episodeDescription}>
                    {shortenDescription(episode.description)}
                  </p>

                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => handlePlayClick(episode)}
                      className={`${styles.playBtn} ${isCurrentlyPlaying ? styles.playing : ""}`}
                    >
                      {isCurrentlyPlaying ? "▶ Playing" : "▶ Play"}
                    </button>
                    <FavouriteButton
                      episode={episode}
                      showTitle={showTitle}
                      seasonNumber={seasonNumber}
                    />
                  </div>
                </div>

                {(episode.image || seasonImage) && (
                  <img
                    src={episode.image || seasonImage}
                    alt={episode.title}
                    className={styles.episodeImage}
                  />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.noEpisodes}>No episodes found for this season.</p>
      )}
    </div>
  );
}
