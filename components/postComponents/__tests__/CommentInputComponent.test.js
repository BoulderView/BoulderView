import React from "react";

import CommentInputComponent from "../CommentInputComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing CommentInputComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<CommentInputComponent />);
  });
});