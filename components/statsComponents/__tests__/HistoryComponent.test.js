import React from "react";

import HistoryComponent from "../HistoryComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing HistoryComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<HistoryComponent />);
  });
});