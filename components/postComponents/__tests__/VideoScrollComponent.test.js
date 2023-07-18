import React from "react";

import VideoScrollComponent from "../VideoScrollComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing VideoScrollComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<VideoScrollComponent />);
  });
});