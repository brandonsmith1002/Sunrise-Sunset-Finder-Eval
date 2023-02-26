import React from 'react';
import PropTypes from 'prop-types';
import { getTranslation } from '../../utils/translations';
import { constructDateObjectFromTimeString, convertUtcDateToLocalDate } from '../../utils/common';

// This is the display for Sunrise and Sunset.  We'll need some help from our utils in
// doing all the conversions.  Here we're given the sunrise and sunset in UTC time strings,
// what is needed is a time string in our local timezone.  To get there: time string -> date object
// -> local date object -> local time string
const SunriseSunsetDisplay = (props: { sunrise: string; sunset: string }) => {
  const localSunriseDate = constructDateObjectFromTimeString(props.sunrise);
  const localSunrise = convertUtcDateToLocalDate(localSunriseDate).toLocaleTimeString('en-US', {
    timeZoneName: 'short',
  });
  const localSunsetDate = constructDateObjectFromTimeString(props.sunset);
  const localSunset = convertUtcDateToLocalDate(localSunsetDate).toLocaleTimeString('en-US', {
    timeZoneName: 'short',
  });

  return (
    <div className="pt-4 d-grid gap-2 d-sm-flex justify-content-sm-center">
      <p className="lead mb-1">{`${getTranslation(
        'SunriseSunsetDisplay',
        'SunriseIsAt',
      )} ${localSunrise}`}</p>
      <div className="vr d-none d-sm-block"></div>
      <p className="lead mb-1">{`${getTranslation(
        'SunriseSunsetDisplay',
        'SunsetIsAt',
      )} ${localSunset}`}</p>
    </div>
  );
};

SunriseSunsetDisplay.propTypes = {
  sunrise: PropTypes.string.isRequired,
  sunset: PropTypes.string.isRequired,
};

export default SunriseSunsetDisplay;
