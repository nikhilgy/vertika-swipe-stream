
import React from "react";
import VideoPlayer from "../components/video/VideoPlayer";
import Navbar from "../components/navigation/Navbar";
import ContentSection from "../components/ContentSection";
import { useVideo } from "../contexts/VideoContext";

const Index = () => {
  const { state, playEpisode } = useVideo();
  const { currentEpisode, episodes, continueWatching } = state;
  
  // Filter episodes that have been watched but not completed
  const continueWatchingEpisodes = episodes.filter(
    episode => continueWatching[episode.id] && 
    continueWatching[episode.id] < episode.durationSec * 0.95
  );

  // Mock trending episodes (first 4 episodes)
  const trendingEpisodes = episodes.slice(0, 4);
  
  // Mock featured episodes (remaining episodes)
  const featuredEpisodes = episodes.slice(4);
  
  return (
    <div className="min-h-screen bg-black">
      {/* Logo at the top */}
      <div className="absolute top-4 left-4 z-50">
        <h1 className="text-xl font-bold text-white">Vert</h1>
      </div>
      
      {/* User profile icon */}
      <div className="absolute top-4 right-4 z-50">
        <div className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">👤</span>
        </div>
      </div>
      
      {/* Main Video Player - takes up top portion */}
      <div className="relative h-[60vh] bg-black">
        <VideoPlayer />
        
        {/* Video overlay info */}
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              {currentEpisode && (
                <>
                  <h2 className="text-white text-2xl font-bold mb-2 uppercase">
                    {currentEpisode.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-black px-6 py-2 rounded font-semibold">
                      View
                    </button>
                    <button className="border border-white text-white p-2 rounded">
                      ♡
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content sections below video */}
      <div className="bg-black text-white px-4 pb-20">
        {/* Continue Watching Section */}
        {continueWatchingEpisodes.length > 0 && (
          <ContentSection
            title="Continue Watching"
            episodes={continueWatchingEpisodes}
            onEpisodeClick={playEpisode}
            showProgress={true}
            continueWatching={continueWatching}
          />
        )}
        
        {/* Trending Today Section */}
        <ContentSection
          title="Trending Today"
          episodes={trendingEpisodes}
          onEpisodeClick={playEpisode}
        />
        
        {/* Featured Shows Section */}
        <ContentSection
          title="Featured Shows"
          episodes={featuredEpisodes}
          onEpisodeClick={playEpisode}
          isGrid={true}
        />
      </div>
      
      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
};

export default Index;
