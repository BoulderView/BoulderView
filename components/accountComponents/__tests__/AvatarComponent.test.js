import React from "react";

import AvatarComponent from "../AvatarComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing AvatarComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<AvatarComponent />);
  });
});