import React from "react";

import NoContentComponent from "../NoContentComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing NoContentComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoContentComponent />);
  });
});