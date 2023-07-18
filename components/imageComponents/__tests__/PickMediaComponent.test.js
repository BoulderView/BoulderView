import React from "react";

import PickMediaComponent from "../PickMediaComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing PickMediaComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<PickMediaComponent />);
  });
});