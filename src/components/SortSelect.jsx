import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { SORTING_CHOICES } from "../context/sorting";
import styles from "./SortSelect.module.css";

/**
 * SortSelect renders a dropdown allowing the user to select the
 * current sort order for the podcast list.
 *
 * @component
 * @returns {JSX.Element} A select element bound to the sortKey in context
 */
export default function SortSelect() {
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      {SORTING_CHOICES.map((choice) => (
        <option key={choice.key} value={choice.key}>
          {choice.label}
        </option>
      ))}
    </select>
  );
}
