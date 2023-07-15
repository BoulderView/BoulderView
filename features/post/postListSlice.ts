import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { postModel } from "../../models/postModel";
import type { RootState } from "../../store";

// Define a type for the slice state
interface postListState {
  postList: postModel[] | undefined;
  currentPost: postModel | undefined;
}

// Define the initial state using that type
const initialState: postListState = {
  postList: undefined,
  currentPost: undefined,
};

export const postListSlice = createSlice({
  name: "postList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Update the list of posts for this gym
    updatePostList: (state, action: PayloadAction<postModel[]>) => {
      state.postList = action.payload;
    },
    // Updates the current post
    updateCurrentPost: (state, action: PayloadAction<postModel>) => {
      state.currentPost = action.payload;
    },
    // Update the number of likes for the current post
    updateCurrentPostLikes: (state, action: PayloadAction<number>) => {
      if (state.currentPost) {
        state.currentPost.likes = action.payload;
      }
    },
    // Matching number of likes for the current post and the corresponding post in postList
    matchCurrentPostList: (state) => {
      if (state.postList && state.currentPost) {
        state.postList.map((post) => {
          if (
            state.currentPost &&
            post.id &&
            post.id === state.currentPost.id
          ) {
            post.likes = state.currentPost.likes;
          }
        });
      }
    },
  },
});

// actions to use
export const {
  updatePostList,
  updateCurrentPost,
  updateCurrentPostLikes,
  matchCurrentPostList,
} = postListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostList = (state: RootState) => state.postList.postList;

export const selectCurrentPost = (state: RootState) =>
  state.postList.currentPost;

export default postListSlice.reducer;
