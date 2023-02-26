/* eslint-disable no-new-object */
/* eslint-disable testing-library/prefer-screen-queries */
// @ts-nocheck
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SunriseFinderLayout from "./SunriseFinderLayout";

describe("<SunriseFinderLayout />", () => {
  test("renders component", () => {
    const { getByTestId } = render(<SunriseFinderLayout />);
    expect(getByTestId("sunriseFinderLayout")).toBeInTheDocument();
  });
});
