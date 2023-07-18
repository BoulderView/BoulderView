import React from "react";

import TabBar from "../TabBar";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing TabBar", () => {
  it("renders correctly", () => {
    renderWithProviders(<TabBar />);
  });
});