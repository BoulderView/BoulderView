import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { commentModel } from "../../models/commentModel";
import type { RootState } from "../../store";

// Define a type for the slice state
interface commentListState {
  commentList: commentModel[] | undefined;
  currentComment: commentModel | undefined;
}

// Define the initial state using that type
const initialState: commentListState = {
  commentList: undefined,
  currentComment: undefined,
};

export const commentListSlice = createSlice({
  name: "commentList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Update the list of posts for this gym
    updateCommentList: (state, action: PayloadAction<commentModel[]>) => {
      state.commentList = action.payload;
    },
    // Update the current comment
    updateCurrentComment: (state, action: PayloadAction<commentModel>) => {
      state.currentComment = action.payload;
    },
    // Update the list to have the comment likes match
    matchCommentLikes: (state) => {
      if (state.commentList && state.commentList) {
        state.commentList.map((comment) => {
          if (
            comment.id &&
            state.currentComment &&
            comment.id === state.currentComment.id
          ) {
            comment.likes = state.currentComment.likes;
          }
        });
      }
    },
  },
});

// actions to use
export const { updateCommentList, updateCurrentComment, matchCommentLikes } =
  commentListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCommentList = (state: RootState) =>
  state.commentList.commentList;

export const selectCurrentComment = (state: RootState) =>
  state.commentList.currentComment;

export default commentListSlice.reducer;
