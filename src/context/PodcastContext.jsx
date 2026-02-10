/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";

/**
 * @typedef Podcast
 * @property {number} id - Unique identifier
 * @property {string} title - Podcast title
 * @property {string} updated - Last updated ISO date string
 * @property {number[]} genres - Array of genre IDs
 * @property {string} image - URL to podcast artwork
 * @property {number} seasons - Number of seasons
 */
/**
 * Sorting options available to the user for viewing podcasts.
 * @type {{key: string, label: string}[]}
 */
// Sorting choices moved to src/context/sorting.js to keep this file focused on React components.

/**
 * React context for sharing podcast state across components.
 * Must be used within a <PodcastProvider>.
 */
export const PodcastContext = createContext();

/**
 * PodcastProvider component wraps children in a context with state for
 * searching, sorting, filtering, and paginating podcast data.
 *
 * @param {{children: React.ReactNode, initialPodcasts: Podcast[]}} props
 * @returns {JSX.Element}
 */
export function PodcastProvider({ children, initialPodcasts }) {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /**
   * Dynamically calculate how many cards can fit on screen.
   * Sets a fixed 10 cards for tablet and smaller screens.
   */
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      // Tablet and smaller (≤ 1024px): always show 10 cards
      if (width <= 1024) {
        setItemsPerPage(10);
        return;
      }

      // For larger screens, calculate based on available width and 2 rows
      const cardW = 260;
      const maxRows = 2;
      const cols = Math.floor(width / cardW);
      const newItemsPerPage = cols * maxRows;

      setItemsPerPage(newItemsPerPage);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  /**
   * Applies the current search query, genre filter, and sort key
   * to the list of podcasts.
   * @returns {Podcast[]} Filtered and sorted podcasts
   */
  const processFilters = () => {
    let list = [...initialPodcasts];

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      list = list.filter((item) =>
        item.title.toLowerCase().includes(lowerQuery),
      );
    }

    if (selectedGenre !== "all") {
      list = list.filter((item) => item.genres.includes(Number(selectedGenre)));
    }

    if (sortOption === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "date-asc") {
      list.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (sortOption === "date-desc") {
      list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortOption === "default") {
      // No sorting
    }

    return list;
  };
  /** @type {Podcast[]} */
  const filteredList = processFilters();
  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const paginatedList = filteredList.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage,
  );

  useEffect(() => {
    // Setting page to 1 when filters change. This is guarded to avoid
    // unnecessary state updates and is acceptable in this context.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage((prev) => (prev === 1 ? prev : 1));
  }, [query, sortOption, selectedGenre]);

  const contextValue = {
    search: query,
    setSearch: setQuery,
    sortKey: sortOption,
    setSortKey: setSortOption,
    genre: selectedGenre,
    setGenre: setSelectedGenre,
    page: activePage,
    setPage: setCurrentPage,
    totalPages,
    podcasts: paginatedList,
    allPodcastsCount: filteredList.length,
  };

  return (
    <PodcastContext.Provider value={contextValue}>
      {children}
    </PodcastContext.Provider>
  );
}
