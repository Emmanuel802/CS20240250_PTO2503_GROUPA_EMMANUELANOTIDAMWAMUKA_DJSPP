import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";
import { AudioContext } from "../context/AudioContext";
import {
  shortenDescription,
  ensureHasAudioOrAlert,
} from "../utils/episodeUtils";
import { formatDate } from "../utils/formatDate";
import Header from "../components/Header";
import styles from "./FavouritesPage.module.css";

/**
 * FavouritesPage
 *
 * Displays all favourited episodes grouped by show.
 * Allows users to sort, play, and remove favourites.
 *
 * @component
 * @returns {JSX.Element} Favourites page
 */
export default function FavouritesPage() {
  const navigate = useNavigate();
  const { favourites, removeFavourite } = useContext(FavouritesContext);
  const { playEpisode } = useContext(AudioContext);
  const [sortOption, setSortOption] = useState("date-newest");

  /**
   * Group favourites by show title
   * @returns {Object} Object with show titles as keys and arrays of episodes as values
   */
  const groupedByShow = () => {
    const groups = {};
    favourites.forEach((fav) => {
      if (!groups[fav.showTitle]) {
        groups[fav.showTitle] = [];
      }
      groups[fav.showTitle].push(fav);
    });
    return groups;
  };

  /**
   * Apply sorting to a list of episodes
   */
  const sortEpisodes = (episodes) => {
    const sorted = [...episodes];
    switch (sortOption) {
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "date-newest":
        return sorted.sort(
          (a, b) => new Date(b.addedDate) - new Date(a.addedDate),
        );
      case "date-oldest":
        return sorted.sort(
          (a, b) => new Date(a.addedDate) - new Date(b.addedDate),
        );
      default:
        return sorted;
    }
  };

  /**
   * Handle play button click
   * Audio comes from API: show.seasons[].episodes[].file
   */
  const handlePlay = (episode) => {
    if (!ensureHasAudioOrAlert(episode)) return;
    playEpisode(episode);
  };

  const groups = groupedByShow();
  const hasNoFavourites = favourites.length === 0;

  return (
    <>
      <Header />

      <main className={styles.favouritesContainer}>
        <div className={styles.content}>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            ← Back to Podcasts
          </button>

          <h1>❤️ My Favourites</h1>

          {!hasNoFavourites && (
            <div className={styles.controls}>
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="date-newest">Newest Added</option>
                <option value="date-oldest">Oldest Added</option>
                <option value="title-asc">A - Z</option>
                <option value="title-desc">Z - A</option>
              </select>
              <p className={styles.count}>
                {favourites.length} favourite
                {favourites.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {hasNoFavourites ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>
                You haven't added any favourites yet.
              </p>
              <p className={styles.emptyHint}>
                Click the heart icon on any episode to add it to your
                favourites!
              </p>
            </div>
          ) : (
            <div className={styles.groupedFavourites}>
              {Object.entries(groups).map(([showTitle, episodes]) => (
                <div key={showTitle} className={styles.showGroup}>
                  <h2 className={styles.showTitle}>{showTitle}</h2>
                  <ul className={styles.episodeList}>
                    {sortEpisodes(episodes).map((episode) => (
                      <li key={episode.id} className={styles.episodeItem}>
                        <div className={styles.episodeInfo}>
                          <div className={styles.episodeHeader}>
                            <h3 className={styles.episodeTitle}>
                              {episode.title}
                            </h3>
                            <span className={styles.seasonBadge}>
                              Season {episode.seasonNumber}
                            </span>
                          </div>

                          <p className={styles.episodeDescription}>
                            {shortenDescription(episode.description, 100)}
                          </p>

                          <div className={styles.episodeMeta}>
                            <span className={styles.addedDate}>
                              Added {formatDate(episode.addedDate)}
                            </span>
                          </div>
                        </div>

                        <div className={styles.episodeActions}>
                          <button
                            onClick={() => handlePlay(episode)}
                            className={styles.playBtn}
                            title="Play this episode"
                          >
                            ▶ Play
                          </button>

                          <button
                            onClick={() => removeFavourite(episode.id)}
                            className={styles.removeBtn}
                            title="Remove from favourites"
                          >
                            ❌
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
