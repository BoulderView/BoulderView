import React from "react";

import { SearchBar } from "../SearchBar";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing SearchBar", () => {
  it("renders correctly", () => {
    renderWithProviders(<SearchBar />);
  });
});