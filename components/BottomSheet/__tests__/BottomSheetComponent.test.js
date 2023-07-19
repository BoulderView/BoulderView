import React from "react";
import BottomSheetComponent from "../BottomSheetComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing BottomSheetComponent", () => {
  const gymModel = {
      id: "",
      name: "",
      cover_image_url: "",
      description: "",
      gym_grade: "",
      latitude: 0,
      longitude: 0,
      address: "",
  }
  it("renders correctly", () => {
    renderWithProviders(<BottomSheetComponent gymModel={gymModel}/>);
  });
});

