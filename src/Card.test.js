import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

/* ************************* Functionality Tests *************************** */


/* ************************* Smoke Tests ************************************ */

describe("smoke tests", function () {
  it("renders without crashing with data", function () {
    render(<Card
      src="./image1.jpg"
      caption="Photo by Richard Pasquarella on Unsplash"
      currNumber="1"
      totalNum="1"
    />);
  });
});

/* ******************** Snapshot Tests Tests ******************************* */

describe("snapshot tests", function () {
  it("matches snapshot", function () {
    const { container } = render(
    <Card
      src="./image1.jpg"
      caption="Photo by Richard Pasquarella on Unsplash"
      currNumber="1"
      totalNum="1"
    />);
    expect(container).toMatchSnapshot();
  });
});