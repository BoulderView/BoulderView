import React from "react";

import VideoComponent from "../VideoComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing VideoComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<VideoComponent />);
  });
});