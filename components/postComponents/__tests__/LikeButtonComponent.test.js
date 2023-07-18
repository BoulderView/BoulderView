import React from "react";

import LikeButtonComponent from "../LikeButtonComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing LikeButtonComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<LikeButtonComponent />);
  });
});