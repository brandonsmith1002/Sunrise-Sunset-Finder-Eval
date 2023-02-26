/* eslint-disable no-new-object */
/* eslint-disable testing-library/prefer-screen-queries */
// @ts-nocheck
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LeafletMap from "./LeafletMap";

describe("<LeafletMap />", () => {
  test("renders component", () => {
    const props = {
      latitude: 0,
      longitude: 0,
      sunrise: "",
    };
    const { getByTestId } = render(<LeafletMap {...props} />);
    expect(getByTestId("leafletMap")).toBeInTheDocument();
  });
});
