
import React from "react";
import EpisodeCard from "./EpisodeCard";
import { Episode } from "../fixtures/data";

interface ContentSectionProps {
  title: string;
  episodes: Episode[];
  onEpisodeClick: (episode: Episode) => void;
  showProgress?: boolean;
  continueWatching?: { [key: string]: number };
  isGrid?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  episodes,
  onEpisodeClick,
  showProgress = false,
  continueWatching = {},
  isGrid = false,
}) => {
  if (episodes.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <button className="text-gray-400 text-sm">→</button>
      </div>
      
      {isGrid ? (
        // Grid layout for Featured Shows
        <div className="grid grid-cols-2 gap-2">
          {episodes.map((episode) => {
            const progress = showProgress && continueWatching[episode.id] 
              ? Math.min((continueWatching[episode.id] / episode.durationSec) * 100, 100)
              : 0;
            
            return (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                progress={progress}
                onClick={() => onEpisodeClick(episode)}
                variant="grid"
              />
            );
          })}
        </div>
      ) : (
        // Horizontal scroll layout
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {episodes.map((episode) => {
            const progress = showProgress && continueWatching[episode.id] 
              ? Math.min((continueWatching[episode.id] / episode.durationSec) * 100, 100)
              : 0;
            
            return (
              <div key={episode.id} className="flex-shrink-0 w-32">
                <EpisodeCard
                  episode={episode}
                  progress={progress}
                  onClick={() => onEpisodeClick(episode)}
                  variant="horizontal"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
