import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import commentListSliceReducer from "./features/comment/commentListSlice";
import gymImageSliceReducer from "./features/gyms/gymImageSlice";
import gymListSliceReducer from "./features/gyms/gymListSlice";
import postListSliceReducer from "./features/post/postListSlice";
import profileSliceReducer from "./features/profile/profileSlice";

/* global store for states */

const rootReducer = combineReducers({
  gymList: gymListSliceReducer,
  gymImage: gymImageSliceReducer,
  profile: profileSliceReducer,
  postList: postListSliceReducer,
  commentList: commentListSliceReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
