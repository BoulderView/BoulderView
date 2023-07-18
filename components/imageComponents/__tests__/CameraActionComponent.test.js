import React from "react";

import CameraActionComponent from "../CameraActionComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing CameraActionComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<CameraActionComponent />);
  });
});