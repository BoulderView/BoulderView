import React from "react";

import WorkoutComponent from "../WorkoutComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing WorkoutComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<WorkoutComponent />);
  });
});