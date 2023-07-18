import React from "react";

import CommentBottomSheetComponent from "../CommentBottomSheetComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing CommentBottomSheetComponent", () => {
  it("renders correctly", () => {
    renderWithProviders(<CommentBottomSheetComponent />);
  });
});