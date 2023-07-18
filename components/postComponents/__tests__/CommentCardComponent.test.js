import React from "react";

import CommentCardComponent from "../CommentCardComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing CommentCardComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<CommentCardComponent />);
  });
});