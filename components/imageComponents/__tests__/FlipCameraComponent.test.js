import React from "react";

import { renderWithProviders } from "../../../utils/test-utils";
import FlipCameraComponent from "../FlipCameraComponent";

describe("Testing FlipCameraComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<FlipCameraComponent />);
  });
});
