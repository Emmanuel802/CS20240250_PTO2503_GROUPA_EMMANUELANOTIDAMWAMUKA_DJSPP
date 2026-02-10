/**
 * Fetches detailed information about a single podcast show by its ID.
 * This includes all seasons and episodes embedded within the show data.
 *
 * @async
 * @param {string|number} showId - The unique ID of the podcast show
 * @returns {Promise<Object>} The SHOW object with seasons and episodes
 * @throws {Error} If the API request fails or show is not found
 *
 * @example
 * const showDetail = await fetchShowDetail("123");
 * console.log(showDetail.title); // "The Podcast Name"
 * console.log(showDetail.seasons); // Array of season objects
 */
export async function fetchShowDetail(showId) {
  try {
    const response = await fetch(
      `https://podcast-api.netlify.app/id/${showId}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch show details. Status: ${response.status}`,
      );
    }

    const showData = await response.json();
    console.log("fetchShowDetail: received data for id", showId, showData);
    return showData;
  } catch (error) {
    console.error("Error fetching show details:", error);
    throw error;
  }
}
