import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FavouritesContext } from "../context/FavouritesContext";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Header.module.css";

/**
 * Header
 *
 * Lightweight header used across pages. Shows the app title,
 * a link to favourites, and a theme toggle button.
 *
 * @component
 * @returns {JSX.Element} Header element with navigation and controls
 */
export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { favouriteCount } = useContext(FavouritesContext);

  return (
    <header className={styles.appHeader}>
      <Link to="/" className={styles.title}>
        <h1>🎙️ Podcast App</h1>
      </Link>

      {/* Hamburger menu for small screens */}
      <div className={styles.controls}>
        <div className={styles.desktopOnly}>
          <Link to="/favourites" className={styles.favouritesLink}>
            ❤️ Favourites
            {favouriteCount > 0 && (
              <span className={styles.badge}>{favouriteCount}</span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
        <div className={styles.mobileOnly}>
          <HamburgerMenu>
            <Link to="/favourites" className={styles.favouritesLink}>
              ❤️ Favourites
              {favouriteCount > 0 && (
                <span className={styles.badge}>{favouriteCount}</span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className={styles.themeToggleBtn}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </HamburgerMenu>
        </div>
      </div>
    </header>
  );
}
