
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { episodes, Episode } from "../fixtures/data";

// Types
type VideoState = {
  currentEpisode: Episode | null;
  episodes: Episode[];
  isPlaying: boolean;
  loading: boolean;
  continueWatching: { [key: string]: number }; // episodeId -> timestamp
};

type VideoAction = 
  | { type: "SET_CURRENT_EPISODE"; payload: Episode }
  | { type: "TOGGLE_PLAY"; payload?: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "NEXT_EPISODE" }
  | { type: "PREVIOUS_EPISODE" }
  | { type: "UPDATE_CONTINUE_WATCHING"; payload: { episodeId: string; timestamp: number } };

type VideoContextType = {
  state: VideoState;
  dispatch: React.Dispatch<VideoAction>;
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
  updateContinueWatching: (episodeId: string, timestamp: number) => void;
};

// Initial State
const initialState: VideoState = {
  currentEpisode: episodes[0],
  episodes: episodes,
  isPlaying: false,
  loading: false,
  continueWatching: {}
};

// Reducer
const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case "SET_CURRENT_EPISODE":
      return {
        ...state,
        currentEpisode: action.payload,
        isPlaying: true,
        loading: false
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        isPlaying: action.payload !== undefined ? action.payload : !state.isPlaying
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "NEXT_EPISODE": {
      if (!state.currentEpisode) return state;
      
      const currentIndex = state.episodes.findIndex(
        episode => episode.id === state.currentEpisode?.id
      );
      
      if (currentIndex < state.episodes.length - 1) {
        return {
          ...state,
          currentEpisode: state.episodes[currentIndex + 1],
          loading: true
        };
      }
      return state;
    }
    case "PREVIOUS_EPISODE": {
      if (!state.currentEpisode) return state;
      
      const currentIndex = state.episodes.findIndex(
        episode => episode.id === state.currentEpisode?.id
      );
      
      if (currentIndex > 0) {
        return {
          ...state,
          currentEpisode: state.episodes[currentIndex - 1],
          loading: true
        };
      }
      return state;
    }
    case "UPDATE_CONTINUE_WATCHING":
      return {
        ...state,
        continueWatching: {
          ...state.continueWatching,
          [action.payload.episodeId]: action.payload.timestamp
        }
      };
    default:
      return state;
  }
};

// Context
const VideoContext = createContext<VideoContextType | null>(null);

// Provider
export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  
  // Load continue watching from localStorage
  useEffect(() => {
    const savedContinueWatching = localStorage.getItem("vertika_continue_watching");
    
    if (savedContinueWatching) {
      try {
        const continueWatchingData = JSON.parse(savedContinueWatching);
        
        // Update the state with the saved data
        Object.entries(continueWatchingData).forEach(([episodeId, timestamp]) => {
          dispatch({
            type: "UPDATE_CONTINUE_WATCHING",
            payload: {
              episodeId,
              timestamp: timestamp as number
            }
          });
        });
      } catch (error) {
        console.error("Failed to parse continue watching data:", error);
      }
    }
  }, []);
  
  // Save continue watching to localStorage when it updates
  useEffect(() => {
    localStorage.setItem("vertika_continue_watching", JSON.stringify(state.continueWatching));
  }, [state.continueWatching]);
  
  const playEpisode = (episode: Episode) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_CURRENT_EPISODE", payload: episode });
  };
  
  const togglePlay = () => {
    dispatch({ type: "TOGGLE_PLAY" });
  };
  
  const nextEpisode = () => {
    dispatch({ type: "NEXT_EPISODE" });
  };
  
  const previousEpisode = () => {
    dispatch({ type: "PREVIOUS_EPISODE" });
  };
  
  const updateContinueWatching = (episodeId: string, timestamp: number) => {
    dispatch({
      type: "UPDATE_CONTINUE_WATCHING",
      payload: { episodeId, timestamp }
    });
  };
  
  return (
    <VideoContext.Provider
      value={{
        state,
        dispatch,
        playEpisode,
        togglePlay,
        nextEpisode,
        previousEpisode,
        updateContinueWatching
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

// Hook
export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
