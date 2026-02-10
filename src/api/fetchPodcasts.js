/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast data from the remote API and updates state accordingly.
 * Handles loading, error, and successful data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 *
 **/
export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  try {
    setLoading(true); // Ensure loading starts immediately

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch("https://podcast-api.netlify.app/shows", {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - Failed to fetch podcasts`);
    }

    const jsonData = await response.json();

    if (!jsonData || !Array.isArray(jsonData)) {
      throw new Error("Invalid podcast data format received");
    }

    setPodcasts(jsonData);
    setError(null); // Clear any previous errors
    console.log(`Successfully loaded ${jsonData.length} podcasts`);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    setError(error.message || "Failed to load podcasts");
    setPodcasts([]); // Clear podcasts on error
  } finally {
    setLoading(false);
  }
}
