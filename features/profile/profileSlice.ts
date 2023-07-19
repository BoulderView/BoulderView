import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

import { Session } from "@supabase/supabase-js";
import { profileModel } from "../../models/profileModel";

// Define a type for the slice state
interface ProfileState {
  session: Session | null;
  profile: profileModel | null;
  avatar: string | null;
}

// Define the initial state using that type
const initialState: ProfileState = {
  session: null,
  profile: null,
  avatar: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Update the profile
    updateProfile: (state, action: PayloadAction<profileModel | null>) => {
      state.profile = action.payload;
    },
    // Update session
    updateSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    // Update the profile's avatar uri
    updateAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar = action.payload;
    },
    // Update the array of liked post
    updateLike: (state, action: PayloadAction<string[]>) => {
      if (state.profile) {
        state.profile.liked_post_id = action.payload;
      }
    },
    // Update the array of liked comments
    updateCommentArray: (state, action: PayloadAction<string[]>) => {
      if (state.profile) {
        state.profile.liked_comment_id = action.payload;
      }
    },
  },
});

// actions to use
export const {
  updateProfile,
  updateSession,
  updateAvatar,
  updateLike,
  updateCommentArray,
} = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profile.profile;

export const selectSession = (state: RootState) => state.profile.session;

export const selectAvatar = (state: RootState) => state.profile.avatar;

export default profileSlice.reducer;
