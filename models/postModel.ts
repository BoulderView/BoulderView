export type postModel = {
  id: string | undefined;
  caption: string,
  post_image_url: string,
  profile_id: string
  created_at: Date,
  updated_at: Date,
  gym_id: string | null,
  is_private: boolean,
  selected_grade: string,
  likes:number
}