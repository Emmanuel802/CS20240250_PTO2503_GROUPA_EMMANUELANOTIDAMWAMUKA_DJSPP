import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShowDetail from "./pages/ShowDetail";
import FavouritesPage from "./pages/FavouritesPage";
import AudioPlayer from "./components/AudioPlayer";

/**
 * Root component of the Podcast Explorer app.
 * Sets up main routing for the application.
 * AudioPlayer is included here so it appears on all pages.
 */
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/show/:showId" element={<ShowDetail />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
      <AudioPlayer />
    </>
  );
}
