import React from "react";
import Navbar from "../components/navigation/Navbar";
import EpisodeCard from "../components/EpisodeCard";
import { useVideo } from "../contexts/VideoContext";
import { episodes } from "../fixtures/data";

const Discover = () => {
  const { playEpisode } = useVideo();
  
  // Group episodes by genre
  const genreGroups: { [key: string]: typeof episodes } = {};
  
  episodes.forEach(episode => {
    episode.genres.forEach(genre => {
      if (!genreGroups[genre]) {
        genreGroups[genre] = [];
      }
      genreGroups[genre].push(episode);
    });
  });
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Logo at the top, scrolls away */}
      <div className="w-full bg-transparent pt-6 pb-2 px-4">
        <h1 className="text-2xl font-bold text-gold">Vertika</h1>
      </div>
      {/* Sticky Navbar below logo */}
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">Discover</h1>
        
        {Object.entries(genreGroups).map(([genre, genreEpisodes]) => (
          <div key={genre} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{genre}</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {genreEpisodes.map(episode => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  onClick={() => playEpisode(episode)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
