import React from "react";

import DashboardComponent from "../DashboardComponent";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Testing HistoryComponent", () => {
    it("renders correctly", () => {
        renderWithProviders(<DashboardComponent />);
    });
});