import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { postModel } from '../../models/postModel';

// Define a type for the slice state
interface postListState {
  postList: postModel[] | undefined;
  currentPost: postModel | undefined
}

// Define the initial state using that type
const initialState: postListState = {
  postList: undefined,
  currentPost: undefined
}

export const postListSlice = createSlice({
  name: 'postList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Insert add and remove gyms features here
    // Use the PayloadAction type to declare the contents of `action.payload`
    updatePostList: (state, action: PayloadAction<postModel[]>) => {
      state.postList = action.payload;
    },
    updateCurrentPost: (state, action: PayloadAction<postModel>) => {
      state.currentPost = action.payload;
    },
    addCurrentPostLikes: (state) => {
      if (state.currentPost) {
        state.currentPost.likes++;
      }
    },
    removeCurrentPostLikes: (state) => {
      if (state.currentPost) {
        state.currentPost.likes--;
      }
    },
    updateCurrentPostLikes: (state, action: PayloadAction<number>) => {
      if (state.currentPost) {
        state.currentPost.likes = action.payload;
      }
    },
  },
});

// actions to use
export const { 
  updatePostList, 
  updateCurrentPost, 
  updateCurrentPostLikes,
  addCurrentPostLikes,
  removeCurrentPostLikes } = postListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostList = (state: RootState) => state.postList.postList;

export const selectCurrentPost = (state: RootState) => state.postList.currentPost;

export default postListSlice.reducer;
