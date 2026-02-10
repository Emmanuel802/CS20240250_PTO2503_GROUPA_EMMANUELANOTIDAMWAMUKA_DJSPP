/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useRef, useEffect } from "react";

/**
 * AudioContext - Manages global audio playback for the entire app
 * Allows audio to continue playing when navigating between pages
 */
export const AudioContext = createContext();

/**
 * AudioProvider - Wraps the app and provides audio playback functionality
 *
 * @param {{children: React.ReactNode}} props
 * @returns {JSX.Element}
 */
export function AudioProvider({ children }) {
  // State for current playing episode
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reference to the audio element (stays the same across re-renders)
  const audioRef = useRef(new Audio());

  // Handle play/pause
  const togglePlayPause = () => {
    if (!currentEpisode) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play a specific episode
  // Audio source comes ONLY from DJS API: episode.file (location: show.seasons[].episodes[].file)
  const playEpisode = (episode) => {
    // Validate episode has audio from API
    if (!episode || !episode.file) {
      console.error(
        "Cannot play: episode missing required audio.file from API",
      );
      return;
    }

    if (currentEpisode?.title === episode.title && isPlaying) {
      return; // Already playing
    }

    // Set audio source to ONLY the episode.file from API
    audioRef.current.src = episode.file;

    setCurrentEpisode(episode);
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Stop playback
  const stopPlayback = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentEpisode(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Handle seeking (when user drags the progress bar)
  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Warn user before leaving if audio is playing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

  const contextValue = {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playEpisode,
    stopPlayback,
    togglePlayPause,
    seek,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}
