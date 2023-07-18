import React from "react";

import PickGradeComponent from "../PickGradeComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing PickGradeComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<PickGradeComponent />);
  });
});