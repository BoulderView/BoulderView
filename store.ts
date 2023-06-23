import { configureStore } from '@reduxjs/toolkit';
import gymListSliceReducer from './features/gyms/gymListSlice';
import gymImageSliceReducer from './features/gyms/gymImageSlice';
import profileSliceReducer from './features/profile/profileSlice';

/* global store for states */

export const store = configureStore({
  reducer: {
    gymList: gymListSliceReducer,
    gymImage: gymImageSliceReducer,
    profile: profileSliceReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
