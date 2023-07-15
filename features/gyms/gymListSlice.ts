import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { gymModel } from "../../models/gymModel";
import type { RootState } from "../../store";

// Define a type for the slice state
interface GymListState {
  gymList: gymModel[] | undefined;
}

// Define the initial state using that type
const initialState: GymListState = {
  gymList: undefined,
};

export const gymListSlice = createSlice({
  name: "gymList",
  initialState,
  reducers: {
    // Updates the current list of gyms
    updateGymList: (state, action: PayloadAction<gymModel[]>) => {
      state.gymList = action.payload;
    },
  },
});

// actions to use
export const { updateGymList } = gymListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGymList = (state: RootState) => state.gymList.gymList;

export default gymListSlice.reducer;
