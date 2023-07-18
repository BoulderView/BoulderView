import React from "react";

import CommentButtonComponent from "../CommentButtonComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing CommentButtonComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<CommentButtonComponent />);
  });
});