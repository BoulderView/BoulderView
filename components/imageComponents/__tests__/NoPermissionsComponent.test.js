import React from "react";

import NoPermissionsComponent from "../NoPermissionsComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing NoPermissionsComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoPermissionsComponent />);
  });
});