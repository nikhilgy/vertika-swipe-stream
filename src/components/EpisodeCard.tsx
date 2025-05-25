
import React from "react";
import { Episode } from "../fixtures/data";

interface EpisodeCardProps {
  episode: Episode;
  onClick: () => void;
  progress?: number; // 0-100
  variant?: "default" | "horizontal" | "grid";
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ 
  episode, 
  onClick, 
  progress = 0,
  variant = "default"
}) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (variant === "horizontal") {
    return (
      <div 
        className="relative rounded overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative">
          <img 
            src={episode.thumbnailUrl} 
            alt={episode.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Progress bar */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
              <div 
                className="h-full bg-red-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        <div className="mt-2">
          <h3 className="text-white text-xs font-medium line-clamp-2">{episode.title}</h3>
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div 
        className="relative rounded overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="aspect-[3/4] relative">
          <img 
            src={episode.thumbnailUrl} 
            alt={episode.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay with title */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white text-sm font-medium line-clamp-2">{episode.title}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant (original)
  return (
    <div 
      className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-[9/16] relative">
        <img 
          src={episode.thumbnailUrl} 
          alt={episode.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-100 transition-opacity">
          {/* Duration */}
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
            {formatDuration(episode.durationSec)}
          </div>
        </div>
        
        {/* Progress bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div 
              className="h-full bg-gold"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="p-2">
        <h3 className="text-sm font-medium truncate">{episode.title}</h3>
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          <span>{episode.views.toLocaleString()} views</span>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
