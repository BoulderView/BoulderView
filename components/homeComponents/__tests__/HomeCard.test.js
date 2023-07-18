import React from "react";

import HomeCard from "../HomeCard";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing HomeCard", () => {
  it("renders correctly", () => {
    renderWithProviders(<HomeCard />);
  });
});