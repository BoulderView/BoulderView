import React from "react";

import MapComponent from "../MapComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing MapComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<MapComponent />);
  });
});