import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { postModel } from '../../models/postModel';

// Define a type for the slice state
interface postListState {
  postList: postModel[] | undefined;
}

// Define the initial state using that type
const initialState: postListState = {
  postList: undefined,
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
  },
});

// actions to use
export const { updatePostList } = postListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostList = (state: RootState) => state.postList;

export default postListSlice.reducer;
