export type commentModel = {
  id?: string;
  created_at: Date;
  comment: string;
  post_id: string;
  profile_id: string;
  likes: number;
  commenter_username: string;
};
