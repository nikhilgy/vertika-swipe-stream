
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
  rating: number;
}

export interface Series {
  id: string;
  creatorId: string;
  title: string;
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
}

// Mock data
export const creators: Creator[] = [
  {
    id: "c1",
    handle: "filmmaster",
    displayName: "Film Master",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    bio: "Creating the best short films on the platform"
  },
  {
    id: "c2",
    handle: "horrorking",
    displayName: "Horror King",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Horror specialist with a twist"
  }
];

export const series: Series[] = [
  {
    id: "s1",
    creatorId: "c1",
    title: "Superboys of Malegaon",
    coverUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    episodeCount: 5,
    createdAt: "2023-01-15"
  },
  {
    id: "s2",
    creatorId: "c2",
    title: "Midnight Tales",
    coverUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434",
    episodeCount: 3,
    createdAt: "2023-02-20"
  }
];

export const episodes: Episode[] = [
  {
    id: "e1",
    seriesId: "s1",
    creatorId: "c1",
    title: "Superboys of Malegaon",
    description: "Follow the journey of aspiring filmmakers in Malegaon as they create their own superhero film.",
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    durationSec: 125,
    views: 15420,
    createdAt: "2023-01-15",
    genres: ["HORROR", "THRILLER", "SLICK"],
    rating: 4.5
  },
  {
    id: "e2",
    seriesId: "s1",
    creatorId: "c1",
    title: "Behind The Scenes",
    description: "Get a glimpse into the making of the Superboys film.",
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517508518934-fa9008b092b4",
    durationSec: 180,
    views: 12340,
    createdAt: "2023-01-18",
    genres: ["DOCUMENTARY", "BEHIND THE SCENES"],
    rating: 4.2
  },
  {
    id: "e3",
    seriesId: "s1",
    creatorId: "c1",
    title: "The Final Showdown",
    description: "The epic conclusion to the Superboys saga.",
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1534103345635-8a91432dc6c1",
    durationSec: 210,
    views: 18750,
    createdAt: "2023-01-25",
    genres: ["ACTION", "CLIMAX", "EPIC"],
    rating: 4.8
  },
  {
    id: "e4",
    seriesId: "s2",
    creatorId: "c2",
    title: "The Haunted Mansion",
    description: "A group of friends explore a haunted mansion with terrifying consequences.",
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1588421357574-87938a86fa28",
    durationSec: 165,
    views: 21350,
    createdAt: "2023-02-20",
    genres: ["HORROR", "THRILLER", "SUSPENSE"],
    rating: 4.3
  }
];
