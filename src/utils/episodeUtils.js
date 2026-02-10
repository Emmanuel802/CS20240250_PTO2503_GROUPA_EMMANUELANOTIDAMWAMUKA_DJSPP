/**
 * Shared helpers for episode display and validation
 */
import { hasAudio } from "./audioUtils";

/**
 * Shortens episode description to a maximum length and appends ellipsis
 * @param {string} description
 * @param {number} maxLength
 * @returns {string}
 */
export function shortenDescription(description, maxLength = 150) {
  if (!description) return "No description available.";
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + "...";
}

/**
 * Validates that an episode has audio (from API) and alerts the user if not.
 * Returns true when audio is available, false otherwise.
 * @param {Object} episode
 * @returns {boolean}
 */
export function ensureHasAudioOrAlert(episode) {
  if (!hasAudio(episode)) {
    // Keep the user-facing message consistent across the app
    alert("❌ No audio available for this episode");
    return false;
  }
  return true;
}
