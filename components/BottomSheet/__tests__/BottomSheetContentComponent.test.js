import React from "react";

import { BottomSheetContentComponent } from "../BottomSheetContentComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing BottomSheetContentComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<BottomSheetContentComponent/>);
  });
});