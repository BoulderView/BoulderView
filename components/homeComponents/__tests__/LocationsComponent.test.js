import React from "react";

import LocationsComponent from "../LocationsComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing LocationsComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<LocationsComponent />);
  });
});
