import {
  isValidIpAddress,
  constructDateObjectFromTimeString,
  convertUtcDateToLocalDate,
} from '../common';

describe('isValidIpAddress', () => {
  it('should return true for valid IP addess', () => {
    expect(isValidIpAddress('192.168.0.1')).toEqual(true);
  });

  it('should return false for invalid IP address', () => {
    expect(isValidIpAddress('192.168.0-1')).toEqual(false);
  });
});

const today = new Date();

describe('constructDateObjectFromTimeString', () => {
  it('should return a Date object with the given time', () => {
    const resp = constructDateObjectFromTimeString('12:00:00 PM');
    expect(resp.getHours()).toEqual(12);
    expect(resp.getMinutes()).toEqual(0);
    expect(resp.getSeconds()).toEqual(0);
    expect(resp.getDate()).toEqual(today.getDate());
  });
});

describe('convertUtcDateToLocalDate', () => {
  it('should return appropriate local Date object', () => {
    const utcDateStr = '2020-08-09T11:17:03.666Z';
    const utcDate = new Date(utcDateStr);
    const localDate = convertUtcDateToLocalDate(utcDate);
    expect(localDate.toUTCString()).toEqual('Sun, 09 Aug 2020 07:17:03 GMT');
  });
});
