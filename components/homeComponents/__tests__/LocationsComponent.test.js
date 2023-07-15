import React from "react";
import renderer from "react-test-renderer";

import LocationsComponent from "../LocationsComponent";

describe("<LocationsComponent />", () => {
  it("has 2 child", () => {
    const tree = renderer.create(<LocationsComponent />);
    const root = tree.root;
    const children = root.children;
    expect(children.length).toBe(2);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<LocationsComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
