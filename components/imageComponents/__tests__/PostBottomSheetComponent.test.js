import React from "react";

import PostBottomSheetComponent from "../PostBottomSheetComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing PostBottomSheetComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<PostBottomSheetComponent />);
  });
});