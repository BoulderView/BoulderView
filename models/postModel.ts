export type postModel = {
  id?: string;
  caption: string,
  post_video_url: string,
  profile_id: string
  created_at: Date,
  updated_at: Date,
  gym_id: string | null,
  is_private: boolean,
  selected_grade?: string,
}