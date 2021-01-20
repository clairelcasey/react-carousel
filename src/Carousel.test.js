import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

/* ************************* Functionality Tests *************************** */

/* ********************* 1. click on arrows test *********************** */

describe("clicking on arrows works", function () {
  it("works when you click on the right arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  });

  it("works when you click on the left arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  });
})

/* ********************* 2. arrows disappear *********************** */

describe("correct arrow disappears when on first/ last image", function () {
  it("left arrow disappears when on first image", function () {
    const { container, queryByTestId, debug } = render(<Carousel />);
    debug(container);
    // expect left-arrow to not be inside of the container
    expect(container.querySelectorAll(".fas").length).toEqual(1);
    expect(queryByTestId("left-arrow")).toBe(null);
  });

  
  it("right arrow disappears when on last image", function () {
    const { container, queryByTestId, queryByAltText, debug } = render(<Carousel />);
    debug(container);
    const rightArrow = queryByTestId("right-arrow");

    // move forward in the carousel to image 2
    fireEvent.click(rightArrow);
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  
    // move forward in the carousel to image 3
    fireEvent.click(rightArrow);
    expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
    
    // expect right-arrow to not be inside of the container
    expect(container.querySelectorAll(".fas").length).toEqual(1);
    expect(queryByTestId("right-arrow")).toBe(null);
  });

})

/* ************************* Smoke Tests ************************************ */

describe("smoke tests", function () {
  it("renders without crashing with default data", function () {
    render(<Carousel />);
  });

  it("renders without crashing with data passed in", function () {
    const data = {
      cardData: [
        {
          src: "./image1.jpg",
          caption: "Photo by Richard Pasquarella on Unsplash"
        },
        {
          src: "./image2.jpg",
          caption: "Photo by Pratik Patel on Unsplash"
        },
        {
          src: "./image3.jpg",
          caption: "Photo by Josh Post on Unsplash"
        }
      ],
      title: "Shells from far away beaches."
    }
    render(<Carousel cardData={data.cardData} title={data.title} />);
  });
});

/* ******************** Snapshot Tests Tests ******************************* */

describe("snapshot tests", function () {
  it("matches snapshot", function () {
    const { container } = render(<Carousel />);
    expect(container).toMatchSnapshot();
  });
});