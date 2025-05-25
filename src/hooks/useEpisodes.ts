
import { useQuery } from '@tanstack/react-query';
import { Episode } from '../types/episode';
import { episodes as mockEpisodes } from '../fixtures/data';

export interface UseEpisodesOptions {
  seriesId?: string;
  page?: number;
  limit?: number;
}

export const useEpisodes = ({ seriesId, page = 1, limit = 10 }: UseEpisodesOptions = {}) => {
  return useQuery({
    queryKey: ['episodes', { seriesId, page, limit }],
    queryFn: async (): Promise<Episode[]> => {
      // Mock implementation - in real app this would call Firestore
      console.log(`Fetching episodes for series: ${seriesId}, page: ${page}, limit: ${limit}`);
      
      let filteredEpisodes = mockEpisodes;
      
      if (seriesId) {
        filteredEpisodes = mockEpisodes.filter(episode => episode.seriesId === seriesId);
      }
      
      // Simulate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return filteredEpisodes.slice(startIndex, endIndex);
    },
    enabled: true,
  });
};

export const useEpisode = (episodeId: string) => {
  return useQuery({
    queryKey: ['episode', episodeId],
    queryFn: async (): Promise<Episode | null> => {
      console.log(`Fetching episode: ${episodeId}`);
      
      const episode = mockEpisodes.find(ep => ep.id === episodeId);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return episode || null;
    },
    enabled: !!episodeId,
  });
};
