import React from "react";

import TagGymComponent from "../TagGymComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing TagGymComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<TagGymComponent />);
  });
});