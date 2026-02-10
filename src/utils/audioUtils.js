/**
 * Extract audio URL from episode object
 * ONLY uses episode.file from the API - no fallbacks or external URLs
 *
 * @param {Object} episode - Episode object from API
 * @returns {string|null} Audio URL or null if not available
 */
export function getAudioUrl(episode) {
  if (episode && episode.file) {
    return episode.file;
  }
  return null;
}

/**
 * Check if episode has a valid audio URL from the API
 *
 * @param {Object} episode - Episode object from API
 * @returns {boolean} True if episode.file exists
 */
export function hasAudio(episode) {
  return episode && episode.file ? true : false;
}
