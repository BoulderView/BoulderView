import React from "react";

import LoadingComponent from "../LoadingComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing LoadingComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingComponent />);
  });
});