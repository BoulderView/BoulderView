import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface GymImageState {
  gymImage: { [key: string]: string };
}

// Define the initial state using that type
const initialState: GymImageState = {
  gymImage: {},
};

export const gymImageSlice = createSlice({
  name: "gymImage",
  initialState,
  reducers: {
    // updates a key-value pair of gym images
    updateGymImage: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      if (!(key in state.gymImage)) {
        state.gymImage = { ...state.gymImage, [key]: value };
      }
    },
  },
});

// actions to use
export const { updateGymImage } = gymImageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGymImage = (state: RootState) => state.gymImage.gymImage;

// Will return the url for the gymImage
export const selectGymImageWithName = (state: RootState, key: string) =>
  state.gymImage.gymImage[key];

export default gymImageSlice.reducer;
