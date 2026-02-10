import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchShowDetail } from "../api/fetchShowDetail";
import { genreData } from "../data";
import Header from "../components/Header";
import SeasonNavigation from "../components/SeasonNavigation";
import { formatDate } from "../utils/formatDate";
import styles from "./ShowDetail.module.css";

/**
 * ShowDetail
 *
 * Page component that fetches and displays detailed information for a
 * specific podcast show. It shows metadata (title, genres, last updated),
 * the show description, and a season navigator that lets users expand
 * seasons and view episodes.
 *
 * The component reads the `showId` URL parameter and fetches the show data
 * using the `fetchShowDetail` helper.
 *
 * @component
 * @returns {JSX.Element} Full show detail page
 */
export default function ShowDetail() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches show details when the component mounts or showId changes
   */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchShowDetail(showId);
        if (!mounted) return;
        console.log("ShowDetail: fetched show", data);
        setShow(data);
      } catch (err) {
        console.error("Error loading show:", err);
        if (!mounted) return;
        setError("Failed to load show details. Please try again later.");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showId]);

  /**
   * Gets genre titles from IDs
   *
   * @param {number[]} genreIds - Array of genre IDs
   * @returns {string[]} Array of genre titles
   */
  const getGenreTitles = (genreIds) => {
    if (!genreIds) return [];
    return genreIds.map((id) => {
      // API sometimes returns genre names directly (strings) instead of numeric ids
      if (typeof id === "string") return id;
      const genre = genreData.find((g) => g.id === id);
      return genre ? genre.title : "Unknown";
    });
  };

  return (
    <>
      <Header />

      <main className={styles.detailContainer}>
        {isLoading && (
          <div className={styles.messageContainer}>
            <div className={styles.spinner}></div>
            <p>Loading show details...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.error}>{error}</p>
            <button className={styles.backButton} onClick={() => navigate("/")}>
              ← Back to Podcasts
            </button>
          </div>
        )}

        {!isLoading && !error && show ? (
          <div className={styles.content}>
            <button className={styles.backButton} onClick={() => navigate("/")}>
              ← Back to Podcasts
            </button>

            <div className={styles.showHeader}>
              <img
                src={show.image}
                alt={show.title}
                className={styles.showImage}
              />

              <div className={styles.showInfo}>
                <h1 className={styles.showTitle}>{show.title}</h1>

                <div className={styles.genreTags}>
                  {getGenreTitles(show.genres).map((genre) => (
                    <span key={genre} className={styles.genreTag}>
                      {genre}
                    </span>
                  ))}
                </div>

                <div className={styles.metadata}>
                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {show.updated ? formatDate(show.updated) : "Unknown"}
                  </p>
                  <p>
                    <strong>Seasons:</strong>{" "}
                    {Array.isArray(show.seasons)
                      ? show.seasons.length
                      : show.seasons || 0}
                  </p>
                </div>

                <div className={styles.description}>
                  <h3>About this show</h3>
                  <p>{show.description}</p>
                </div>
              </div>
            </div>

            <SeasonNavigation seasons={show.seasons} showTitle={show.title} />
            {/* Debug: show raw data if any field is missing (temporary) */}
            {show && (!show.title || !show.description) && (
              <pre style={{ color: "var(--text-color)", marginTop: "1rem" }}>
                {JSON.stringify(show, null, 2)}
              </pre>
            )}
          </div>
        ) : (
          !isLoading &&
          !error && (
            <div className={styles.notFoundContainer}>
              <p className={styles.notFound}>Show not found.</p>
              <button
                className={styles.backButton}
                onClick={() => navigate("/")}
              >
                ← Back to Podcasts
              </button>
            </div>
          )
        )}
      </main>
    </>
  );
}
