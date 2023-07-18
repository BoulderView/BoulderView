import React from "react";

import LeaderboardComponent from "../LeaderboardComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing LeaderboardComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<LeaderboardComponent />);
  });
});
