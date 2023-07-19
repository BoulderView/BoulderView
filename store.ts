import { configureStore } from "@reduxjs/toolkit";
import commentListSliceReducer from "./features/comment/commentListSlice";
import gymImageSliceReducer from "./features/gyms/gymImageSlice";
import gymListSliceReducer from "./features/gyms/gymListSlice";
import postListSliceReducer from "./features/post/postListSlice";
import profileSliceReducer from "./features/profile/profileSlice";

/* global store for states */

export const store = configureStore({
  reducer: {
    gymList: gymListSliceReducer,
    gymImage: gymImageSliceReducer,
    profile: profileSliceReducer,
    postList: postListSliceReducer,
    commentList: commentListSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
