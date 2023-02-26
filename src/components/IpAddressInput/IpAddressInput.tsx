import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getTranslation } from "../../utils/translations";
import { isValidIpAddress } from "../../utils/common";

// This component is the IP address input and auto fill button.  It
// does not store the state of the IP address, but instead uses the setter
// function passed through props.  This is because the IP address is needed
// in other components.  It does handle validation with the help of a helper utility.
const IpAddressInput = (props: {
  isInputValid: { current: () => boolean };
  setIpAddress: (arg0: string) => void;
  ipAddress: string;
  onGetGeoLocation: () => void;
}) => {
  const [ipAddressValid, setIPAddressValid] = useState<boolean>(true);
  // State of whether to show loading message or now
  const [loading, setLoading] = useState<boolean>(false);

  // This allows the parent function to call the validateIpAddress function.
  // This is needed when the user activates the "Go" button, we need to check
  // if the IP address is valid and activate the is-invalid classes if not.
  useEffect(() => {
    props.isInputValid.current = validateIpAddress;
  });

  const onIpAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) {
      setLoading(false);
    }
    let val = e.target.value;
    val = val.replace(/[^0-9.]/g, ""); // Only numbers and decimals
    props.setIpAddress(val);
  };

  const validateIpAddress = (): boolean => {
    const valid: boolean = isValidIpAddress(props.ipAddress);
    setIPAddressValid(valid);
    return valid;
  };

  // The user has used the "Auto Fill" button.  Reset the input field,
  // toggle the loading message on, set IP as valid and call our props
  // function to get the API request on it's way.
  const onAutoFill = () => {
    props.setIpAddress("");
    setLoading(true);
    setIPAddressValid(true);
    props.onGetGeoLocation();
  };

  // Simple error message displayed under the input field
  const getErrorMessage = () => {
    return (
      <div className="text-danger">
        <small>{getTranslation("IpAddressInput", "InvalidIpMessage")}</small>
      </div>
    );
  };

  return (
    <div
      className="d-grid gap-2 d-sm-flex justify-content-sm-center"
      data-testid="ipAddressInput"
    >
      <div className="mb-3">
        <label className="form-label">
          {getTranslation("IpAddressInput", "IpAddress")}
        </label>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${!ipAddressValid ? "is-invalid" : ""}`}
            placeholder={
              loading
                ? getTranslation("IpAddressInput", "Loading")
                : getTranslation("IpAddressInput", "IpAddress")
            }
            value={props.ipAddress}
            onChange={onIpAddressChange}
            onBlur={validateIpAddress}
          ></input>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onAutoFill}
            title={getTranslation("IpAddressInput", "AutoFillTooltip")}
          >
            {getTranslation("IpAddressInput", "AutoFill")}
          </button>
        </div>
        {!ipAddressValid && getErrorMessage()}
      </div>
    </div>
  );
};

IpAddressInput.propTypes = {
  ipAddress: PropTypes.string.isRequired,
  setIpAddress: PropTypes.func.isRequired,
  onGetGeoLocation: PropTypes.func.isRequired,
  isInputValid: PropTypes.object.isRequired,
};

export default IpAddressInput;
