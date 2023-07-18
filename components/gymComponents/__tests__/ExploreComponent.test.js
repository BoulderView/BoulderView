import React from "react";

import ExploreComponent from "../ExploreComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing ExploreComponent", () => {
  it("renders correctly", () => {
    const gymId = ""
    renderWithProviders(<ExploreComponent gymId={gymId}/>);
  });
});
