import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./ShowsCarousel.module.css";

/**
 * ShowsCarousel
 *
 * Displays a horizontally scrollable carousel of podcast shows.
 * Users can navigate with arrow buttons. Clicking a show goes to its detail page.
 *
 * @component
 * @param {{shows: Array<Object>, genres: Array<Object>}} props
 * @param {Array<Object>} props.shows - Array of show objects
 * @param {Array<Object>} props.genres - Genre definitions for mapping genre IDs
 * @returns {JSX.Element} Horizontally scrollable carousel
 */
export default function ShowsCarousel({ shows = [], genres = [] }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check if carousel can scroll
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Scroll carousel
  const handleScroll = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = 300; // How far to scroll per click
    const currentScroll = carouselRef.current.scrollLeft;

    if (direction === "left") {
      carouselRef.current.scrollTo({
        left: Math.max(0, currentScroll - scrollAmount),
        behavior: "smooth",
      });
    } else {
      carouselRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }

    // Check scroll buttons after a delay
    setTimeout(updateScrollButtons, 300);
  };

  // Get genre titles from IDs
  const getGenreTitles = (genreIds) => {
    if (!genreIds) return [];
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.title : "Unknown";
    });
  };

  // Called when carousel first mounts
  const handleCarouselMount = () => {
    updateScrollButtons();
  };

  if (!shows || shows.length === 0) {
    return null;
  }

  return (
    <section className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>✨ Recommended Shows</h2>

      <div className={styles.carouselWrapper}>
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll("left")}
            className={`${styles.arrowBtn} ${styles.leftArrow}`}
            aria-label="Scroll left"
            title="Previous shows"
          >
            ◀
          </button>
        )}

        {/* Scrollable Carousel */}
        <div
          ref={carouselRef}
          className={styles.carousel}
          onLoad={handleCarouselMount}
          onScroll={updateScrollButtons}
        >
          {shows.map((show) => (
            <Link
              key={show.id}
              to={`/show/${show.id}`}
              className={styles.carouselItem}
            >
              <div className={styles.showCard}>
                {/* Show Image */}
                <img
                  src={show.image}
                  alt={show.title}
                  className={styles.showImage}
                />

                {/* Show Info */}
                <div className={styles.showInfo}>
                  <h3 className={styles.showTitle}>{show.title}</h3>

                  {/* Genre Tags */}
                  <div className={styles.genreTags}>
                    {getGenreTitles(show.genres)
                      .slice(0, 2)
                      .map((genre) => (
                        <span key={genre} className={styles.genreTag}>
                          {genre}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Overlay hint */}
                <div className={styles.overlay}>
                  <span className={styles.hoverText}>View Show →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll("right")}
            className={`${styles.arrowBtn} ${styles.rightArrow}`}
            aria-label="Scroll right"
            title="Next shows"
          >
            ▶
          </button>
        )}
      </div>
    </section>
  );
}
