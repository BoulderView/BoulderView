import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

import { profileModel } from '../../models/profileModel';
import { Session } from '@supabase/supabase-js';

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
  avatar: null
}

export const profileSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Insert add and remove gyms features here
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateProfile: (state, action: PayloadAction<profileModel | null>) => {
      state.profile = action.payload;
    },
    updateSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar = action.payload;
    },
    addToLikeArray: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.liked_post_id = [...state.profile.liked_post_id, action.payload];
      }
    },
    removeFromLikeArray: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        const index = state.profile.liked_post_id.findIndex(
          (item) => item === action.payload
        )
        let newBasket = [...state.profile.liked_post_id];

        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.warn(`unable to remove like ${action.payload}`);
        }
        state.profile.liked_post_id = newBasket;
      }
    },
    updateLike: (state, action: PayloadAction<string[]>) => {
      if (state.profile) {
        state.profile.liked_post_id = action.payload;
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
  addToLikeArray,
  removeFromLikeArray 
} = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profile.profile;

export const selectSession = (state: RootState) => state.profile.session;

export const selectAvatar = (state: RootState) => state.profile.avatar;

export default profileSlice.reducer;