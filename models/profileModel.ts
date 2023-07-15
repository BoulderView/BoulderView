export type profileModel = {
  id: string;
  username: string;
  full_name: string;
  description: string;
  avatar_url: string;
  updated_at: Date;
  liked_post_id: string[];
};
