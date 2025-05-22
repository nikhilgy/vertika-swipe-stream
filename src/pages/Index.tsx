
import React from "react";
import VideoPlayer from "../components/video/VideoPlayer";
import Navbar from "../components/navigation/Navbar";
import EpisodeCard from "../components/EpisodeCard";
import { useVideo } from "../contexts/VideoContext";

const Index = () => {
  const { state, playEpisode } = useVideo();
  const { currentEpisode, episodes, continueWatching } = state;
  
  // Filter episodes that have been watched but not completed
  const continueWatchingEpisodes = episodes.filter(
    episode => continueWatching[episode.id] && 
    continueWatching[episode.id] < episode.durationSec * 0.95
  );
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Main Video Player */}
      <div className="w-full h-screen bg-black">
        <VideoPlayer />
      </div>
      
      {/* Continue Watching Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {continueWatchingEpisodes.length > 0 ? (
            continueWatchingEpisodes.map(episode => {
              const progress = Math.min(
                (continueWatching[episode.id] / episode.durationSec) * 100,
                100
              );
              
              return (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  progress={progress}
                  onClick={() => playEpisode(episode)}
                />
              );
            })
          ) : (
            <p className="text-muted-foreground col-span-full text-center py-8">
              No episodes in progress. Start watching!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
