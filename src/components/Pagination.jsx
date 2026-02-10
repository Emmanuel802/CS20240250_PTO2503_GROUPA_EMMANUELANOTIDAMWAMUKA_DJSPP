import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import styles from "./Pagination.module.css";

/**
 * Pagination component that displays page buttons for navigating podcast lists.
 * @returns {JSX.Element|null} The pagination buttons or null if only one page.
 */
export default function Pagination() {
  const { page, setPage, totalPages } = useContext(PodcastContext);

  if (totalPages <= 1) return null;

  /**
   * Build page list.
   */
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationWrapper}>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`${styles.pageButton} ${
            num === page ? styles.active : ""
          }`}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
