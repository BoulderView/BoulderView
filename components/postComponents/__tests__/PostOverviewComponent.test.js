import React from "react";

import PostOverviewComponent from "../PostOverviewComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing PostOverviewComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<PostOverviewComponent />);
  });
});