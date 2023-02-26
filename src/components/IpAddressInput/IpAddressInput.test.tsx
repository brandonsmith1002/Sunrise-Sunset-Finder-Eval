/* eslint-disable no-new-object */
/* eslint-disable testing-library/prefer-screen-queries */
// @ts-nocheck
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import IpAddressInput from "./IpAddressInput";

describe("<IpAddressInput />", () => {
  test("renders component", () => {
    const props = {
      isInputValid: new Object({ current: () => true }),
      setIpAddress: jest.fn(),
      ipAddress: "",
      onGetGeoLocation: jest.fn(),
    };
    const { getByTestId } = render(<IpAddressInput {...props} />);
    expect(getByTestId("ipAddressInput")).toBeInTheDocument();
  });
});
