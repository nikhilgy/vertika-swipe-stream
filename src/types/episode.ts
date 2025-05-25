
export interface Episode {
  id: string;
  seriesId: string;
  creatorId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationSec: number;
  views: number;
  createdAt: string;
  genres: string[];
}

export interface Series {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  coverUrl: string;
  episodeCount: number;
  createdAt: string;
}

export interface Creator {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
}

export interface UploadProgress {
  progress: number;
  stage: 'compressing' | 'uploading' | 'processing' | 'complete';
  eta?: number;
}
