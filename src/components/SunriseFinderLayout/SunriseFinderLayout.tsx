import React, { useState, useRef } from "react";
import { getTranslation } from "../../utils/translations";
import IpAddressInput from "../IpAddressInput/IpAddressInput";
import SunriseSunsetDisplay from "../SunriseSunsetDisplay/SunriseSunsetDisplay";
import LeafletMap from "../LeafletMap/LeafletMap";
import { getGeoFromIp } from "../../services/geoIp";
import { getGeoLocation } from "../../services/geoLocation";
import { getSunriseSunset } from "../../services/sunriseSunset";

// This component is the main layout and our higher order component for
// the Sunrise & Sunset finder page.
const SunriseFinderLayout = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(null);
  const [longitude, setLongitude] = useState<number>(null);
  const [sunrise, setSunrise] = useState<string>(null);
  const [sunset, setSunset] = useState<string>(null);

  // This will allow us the call a child's function, in this case we need
  // to have the IpAddressInput component call it's validator function
  // when the user clicks on the 'Go' button.
  const isIpAddressInputValid = useRef(null);

  // This function will call our getSunriseSunset service function.  This
  // is needed in two different situations, so we have an optional lat lng params.
  const callGetSunriseSunset = (lat?: number, lng?: number) => {
    getSunriseSunset(lat || latitude, lng || longitude)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        const sunrise: string = result?.data?.results?.sunrise || "";
        const sunset: string = result?.data?.results?.sunset || "";
        if (result?.data?.results) {
          setSunrise(sunrise);
          setSunset(sunset);
        } else {
          console.error(
            "Failed to get sunrise/sunset data from api.sunrise-sunset.org"
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // The user click 'Go' button, this is where the magic happens. If they used the auto fill
  // option, then we already have the geo data and don't need to make another API call to get it.
  // We'll go right to the callGetSunriseSunset().  If the user manually entered an IP, we need to
  // make an API call to get the geo data, then another API call to get the SunriseSunset.  We simply
  // linking the promises here.
  const onFindSunriseSunset = () => {
    // Ask our child, the IpAddressInput, to validate the IP.  It will turn red and tell the user
    // they need to have a valid IP if they don't already.
    const inputValid = isIpAddressInputValid.current();
    if (inputValid) {
      // If we have lat and lng then get sunrise / sunset times
      if (latitude && longitude) {
        callGetSunriseSunset();
      } else if (ipAddress !== "") {
        // We have ip address, so use it to get lat lng
        getGeoFromIp(ipAddress)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((result: any) => {
            const location = result?.data?.data?.location;
            if (location) {
              const lat: number = location.latitude || null;
              const lng: number = location.longitude || null;
              setLatitude(lat);
              setLongitude(lng);
              // We need to pass lat and lng because the state will not be updated yet.
              callGetSunriseSunset(lat, lng);
            } else {
              console.error("Failed to get location data from api.ipbase.com");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  // When user clicks 'auto fill' button, do an API call for geo location, store it
  // in state
  const onGetGeoLocation = () => {
    getGeoLocation()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        const ip: string = result?.data?.IPv4 || "";
        const lat: number = result?.data?.latitude || 0;
        const lng: number = result?.data?.longitude || 0;
        if (result?.data) {
          setIpAddress(ip);
          setLatitude(lat);
          setLongitude(lng);
        } else {
          console.error("Failed to get location data from geolocation-db");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onIpAddressChange = (ip: string) => {
    setIpAddress(ip);
    // clear lat and lng so a new search doesn't use them
    setLatitude(null);
    setLongitude(null);
  };

  return (
    <div
      className="px-3 py-3 my-5 text-center"
      data-testid="sunriseFinderLayout"
    >
      <h1 className="display-5 fw-bold">
        {getTranslation("SunriseFinderLayout", "Title")}
      </h1>
      <p className="lead mb-4">
        {getTranslation("SunriseFinderLayout", "PageDescription")}
      </p>
      <IpAddressInput
        ipAddress={ipAddress}
        setIpAddress={onIpAddressChange}
        onGetGeoLocation={onGetGeoLocation}
        isInputValid={isIpAddressInputValid}
      ></IpAddressInput>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg px-4 gap-3"
          onClick={onFindSunriseSunset}
        >
          {getTranslation("SunriseFinderLayout", "Go")}
        </button>
      </div>
      {sunrise && sunset ? (
        <SunriseSunsetDisplay
          sunrise={sunrise}
          sunset={sunset}
        ></SunriseSunsetDisplay>
      ) : null}
      <LeafletMap
        latitude={latitude}
        longitude={longitude}
        sunrise={sunrise}
      ></LeafletMap>
    </div>
  );
};

export default SunriseFinderLayout;
