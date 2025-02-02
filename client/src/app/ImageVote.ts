export interface ImageVote {
  id: number;
  imageUrl: string;
  likes: number;
  dislikes: number;
}

export interface ImageVoteRequest {
  imageUrl: string;
  likes?: number;
  dislikes?: number;
}
