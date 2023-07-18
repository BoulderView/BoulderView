import React from "react";

import PreviewMediaComponent from "../PreviewMediaComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing PreviewMediaComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<PreviewMediaComponent />);
  });
});