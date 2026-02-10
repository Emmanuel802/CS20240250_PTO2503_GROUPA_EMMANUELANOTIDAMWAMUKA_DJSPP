import { useState } from "react";
import EpisodeList from "./EpisodeList";
import styles from "./SeasonNavigation.module.css";

/**
 * SeasonNavigation component allows users to expand/collapse seasons
 * and view episodes for each season.
 *
 * @param {Object} props - Component props
 * @param {Array} props.seasons - Array of season objects
 * @param {string} [props.showTitle] - Title of the show (for audio player context)
 * @returns {JSX.Element} Season navigation UI with expandable seasons
 */
export default function SeasonNavigation({ seasons, showTitle = "Podcast" }) {
  // Track which seasons are expanded by their number
  const [expandedSeasons, setExpandedSeasons] = useState(new Set());

  /**
   * Toggle a season's expanded/collapsed state
   *
   * @param {number} seasonNumber - The season number to toggle
   */
  const toggleSeason = (seasonNumber) => {
    const newExpanded = new Set(expandedSeasons);

    if (newExpanded.has(seasonNumber)) {
      newExpanded.delete(seasonNumber);
    } else {
      newExpanded.add(seasonNumber);
    }

    setExpandedSeasons(newExpanded);
  };

  return (
    <div className={styles.seasonContainer}>
      <h2 className={styles.seasonTitle}>Seasons</h2>

      {seasons && seasons.length > 0 ? (
        <div className={styles.seasonList}>
          {seasons.map((season, index) => {
            const seasonNumber = index + 1;
            const isExpanded = expandedSeasons.has(seasonNumber);
            const episodeCount = season.episodes ? season.episodes.length : 0;

            return (
              <div key={seasonNumber} className={styles.seasonItem}>
                <button
                  className={styles.seasonButton}
                  onClick={() => toggleSeason(seasonNumber)}
                  aria-expanded={isExpanded}
                >
                  <span className={styles.seasonHeader}>
                    <span className={styles.seasonNumber}>
                      Season {seasonNumber}
                    </span>
                    <span className={styles.episodeCount}>
                      {episodeCount} episode{episodeCount !== 1 ? "s" : ""}
                    </span>
                  </span>
                  <span
                    className={`${styles.chevron} ${isExpanded ? styles.expanded : ""}`}
                  >
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <EpisodeList
                    episodes={season.episodes}
                    seasonImage={season.image}
                    showTitle={showTitle}
                    seasonNumber={seasonNumber}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles.noSeasons}>No seasons found for this show.</p>
      )}
    </div>
  );
}
