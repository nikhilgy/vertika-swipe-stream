
import React, { useRef, useState, useEffect } from "react";
import { useVideo } from "../../contexts/VideoContext";
import SwipeContainer from "../ui/SwipeContainer";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  episodeId?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episodeId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { state, togglePlay, nextEpisode, previousEpisode, updateContinueWatching } = useVideo();
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { currentEpisode, isPlaying, loading } = state;
  
  // Auto-hide controls after inactivity
  const resetControlsTimer = () => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    setShowControls(true);
    
    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  
  // Handle play/pause
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.play().catch(error => {
        console.error("Error playing video:", error);
        togglePlay();
      });
    } else {
      videoElement.pause();
    }
  }, [isPlaying, togglePlay]);
  
  // Handle episode changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !currentEpisode) return;
    
    videoElement.load();
    
    // Check if there's a saved position
    const savedPosition = state.continueWatching[currentEpisode.id];
    if (savedPosition) {
      videoElement.currentTime = savedPosition;
    }
    
    if (isPlaying) {
      videoElement.play().catch(console.error);
    }
  }, [currentEpisode, isPlaying, state.continueWatching]);
  
  // Track video time
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !currentEpisode) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      
      // Save position every 5 seconds
      if (Math.floor(videoElement.currentTime) % 5 === 0) {
        updateContinueWatching(currentEpisode.id, videoElement.currentTime);
      }
    };
    
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentEpisode, updateContinueWatching]);
  
  // Handle video end
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleEnded = () => {
      nextEpisode();
    };
    
    videoElement.addEventListener("ended", handleEnded);
    return () => {
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [nextEpisode]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  const toggleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  };
  
  const handleVideoClick = () => {
    resetControlsTimer();
  };
  
  if (!currentEpisode) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black">
        <p className="text-white">No episode selected</p>
      </div>
    );
  }

  return (
    <div className="video-player-container">
      <SwipeContainer
        onSwipeLeft={nextEpisode}
        onSwipeRight={previousEpisode}
      >
        <div className="h-full w-full relative" onClick={handleVideoClick}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="w-12 h-12 border-4 border-t-red-600 border-solid rounded-full animate-spin"></div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={currentEpisode.thumbnailUrl}
            preload="auto"
          >
            <source src={currentEpisode.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Minimal Video Controls - Shows only on interaction */}
          <div className={`video-controls ${showControls ? 'show' : ''}`}>
            <div className="flex items-center justify-center">
              <button 
                onClick={toggleVideoPlay}
                className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="text-white" size={32} />
                ) : (
                  <Play className="text-white" size={32} />
                )}
              </button>
            </div>
          </div>
        </div>
      </SwipeContainer>
    </div>
  );
};

export default VideoPlayer;
