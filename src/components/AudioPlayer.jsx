import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import styles from "./AudioPlayer.module.css";

/**
 * AudioPlayer
 *
 * Fixed player at the bottom of the screen showing the currently playing episode.
 * Displays play/pause controls, seek bar, and current time / duration.
 *
 * @component
 * @returns {JSX.Element} Audio player UI or null if nothing is playing
 */
export default function AudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    stopPlayback,
    seek,
  } = useContext(AudioContext);

  // Don't show player if no episode is loaded
  if (!currentEpisode) {
    return null;
  }

  /**
   * Format time in seconds to MM:SS format
   * @param {number} time - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.audioPlayerContainer}>
      <div className={styles.playerContent}>
        {/* Episode Title */}
        <div className={styles.episodeInfo}>
          <h4 className={styles.episodeTitle}>{currentEpisode.title}</h4>
          <p className={styles.episodeSubtitle}>
            {currentEpisode.showTitle || "Podcast"}
          </p>
        </div>

        {/* Controls */}
        <div className={styles.playerControls}>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className={styles.playPauseBtn}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          {/* Seek Bar */}
          <div className={styles.seekBar}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className={styles.seekSlider}
              aria-label="Seek"
            />
          </div>

          {/* Time Display */}
          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span>
            <span className={styles.divider}>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Stop Button */}
          <button
            onClick={stopPlayback}
            className={styles.stopBtn}
            aria-label="Stop"
          >
            ⏹
          </button>
        </div>
      </div>
    </div>
  );
}
