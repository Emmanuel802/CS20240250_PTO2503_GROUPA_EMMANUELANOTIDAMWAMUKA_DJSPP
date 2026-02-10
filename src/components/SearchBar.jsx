import { useState, useEffect, useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import styles from "./SearchBar.module.css";

/**
 * SearchBar component provides a text input for filtering podcasts.
 * Input updates are debounced (300ms) before applying to context state.
 *
 * @component
 * @returns {JSX.Element} A controlled search input element
 */
export default function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);
  const [inputValue, setInputValue] = useState(search);

  // Debounce input (300ms) to avoid rapid updates.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <input
      type="search"
      placeholder="Search podcasts…"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className={styles.searchInput}
    />
  );
}
