/* eslint-disable no-new-object */
/* eslint-disable testing-library/prefer-screen-queries */
// @ts-nocheck
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SunriseSunsetDisplay from "./SunriseSunsetDisplay";

describe("<SunriseSunsetDisplay />", () => {
  test("renders component", () => {
    const props = {
      sunrise: "",
      sunset: "",
    };
    const { getByTestId } = render(<SunriseSunsetDisplay {...props} />);
    expect(getByTestId("sunriseSunsetDisplay")).toBeInTheDocument();
  });
});
