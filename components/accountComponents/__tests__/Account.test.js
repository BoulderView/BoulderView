import React from "react";

import Account from "../Account";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing Account", () => {
  it("renders correctly", () => {
    renderWithProviders(<Account />);
  });
});