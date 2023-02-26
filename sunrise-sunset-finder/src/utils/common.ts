// Common utils functions to be used through the app

// Inputs a string checks to see if it's a valid IP Address
export const isValidIpAddress = (str: string): boolean => {
  try {
    const splitStr: string[] = str.split('.');
    if (splitStr.length !== 4) return false;
    return (
      Number.parseInt(splitStr[0]) >= 0 &&
      Number.parseInt(splitStr[0]) <= 255 &&
      Number.parseInt(splitStr[1]) >= 0 &&
      Number.parseInt(splitStr[1]) <= 255 &&
      Number.parseInt(splitStr[2]) >= 0 &&
      Number.parseInt(splitStr[2]) <= 255 &&
      Number.parseInt(splitStr[3]) >= 0 &&
      Number.parseInt(splitStr[3]) <= 255
    );
  } catch (Exception) {
    return false;
  }
};

// Inputs a time string and returns a Date object of the current date with the time of
// the inputted string.
export const constructDateObjectFromTimeString = (timeString: string): Date => {
  const today: Date = new Date();
  let hour: string = null;
  let minutes: string = null;
  let seconds: string = null;
  let PM = false;

  // Check if the given time string is in PM format
  if (timeString.indexOf('PM') !== -1) {
    PM = true;
  }

  // Get hour, minutes and seconds from the given time string
  [hour, minutes, seconds] = timeString.split(/[:|\s]/);

  // Calculate hour according to the PM or AM format
  if (PM && hour !== '12') {
    hour = (parseInt(hour) + 12).toString();
  } else if (!PM && hour === '12') {
    hour = '0';
  }

  // Construct the date object by setting the corresponding properties
  const dateObj = new Date();
  dateObj.setHours(Number(hour));
  dateObj.setMinutes(Number(minutes));
  dateObj.setSeconds(Number(seconds));
  dateObj.setDate(today.getDate());
  dateObj.setMonth(today.getMonth());
  dateObj.setFullYear(today.getFullYear());
  return dateObj;
};

// Inputs a Date object with UTC and converts it to Date object with local time
export const convertUtcDateToLocalDate = (utcDate: Date): Date => {
  const localDate = new Date(utcDate.valueOf());
  const localOffset = utcDate.getTimezoneOffset();
  localDate.setMinutes(utcDate.getMinutes() - localOffset);
  return localDate;
};
