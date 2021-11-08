import {
  DAY_IN_MILLISECONDS,
  AMOUNT_IN_CALENDAR,
  NUMBER_OF_MONTH_IN_YEAR,
} from '../constants';

const color = {
  light: 'light',
  dark: 'dark',
};

const isLeapYear = ({ timestamp }) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
    return true;
  }
  return false;
};

const getMillisecondsOfAYear = ({ timestamp }) => {
  if (isLeapYear({ timestamp })) {
    return 366 * DAY_IN_MILLISECONDS;
  }
  return 365 * DAY_IN_MILLISECONDS;
};

const dateTimestampTrimmer = ({ timestamp }) => {
  const DateObj = new Date(timestamp);
  DateObj?.setHours(0, 0, 0, 0);
  return DateObj?.getTime();
};

const getTrimmedTodayTimestamp = () => dateTimestampTrimmer({ timestamp: Date?.now() });

const getEdgeDateInMonthTimestamp = ({
  timestamp,
  when = 'firstDate',
}) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  let resultDateObj;
  switch (when) {
    case 'firstDate': {
      resultDateObj = new Date(year, month, 1);
      break;
    }
    case 'lastDate': {
      resultDateObj = new Date(year, month + 1, 0);
      break;
    }
    default: {
      resultDateObj = undefined;
      break;
    }
  }
  return resultDateObj?.getTime() || undefined;
};

const getEssentialTimestamps = ({ timestamp }) => {
  const firstDateInMonthObj = new Date(getEdgeDateInMonthTimestamp({
    timestamp,
    when: 'firstDate',
  }));
  const lastDateInMonthObj = new Date(getEdgeDateInMonthTimestamp({
    timestamp,
    when: 'lastDate',
  }));
  const firstDayInMonth = firstDateInMonthObj.getDay();
  return {
    firstDateInMonthTimestamp: firstDateInMonthObj.getTime(),
    lastDateInMonthTimestamp: lastDateInMonthObj.getTime(),
    startTimestamp: firstDateInMonthObj.getTime() - firstDayInMonth * DAY_IN_MILLISECONDS,
  };
};

const getDateListOfMonth = ({ selectedTimestamp }) => {
  const trimmedTimestamp = dateTimestampTrimmer({
    timestamp: selectedTimestamp,
  });
  const {
    startTimestamp,
    firstDateInMonthTimestamp,
    lastDateInMonthTimestamp,
  } = getEssentialTimestamps({
    timestamp: trimmedTimestamp,
  });
  const list = new Array(AMOUNT_IN_CALENDAR).fill(0);
  return list.map((elem, index) => {
    const timestamp = startTimestamp + index * DAY_IN_MILLISECONDS;
    const data = {
      timestamp,
      date: new Date(timestamp).getDate(),
      color:
        firstDateInMonthTimestamp <= timestamp && timestamp <= lastDateInMonthTimestamp
          ? color.dark
          : color.light,
    };
    return data;
  });
};

const getDaysInMonth = ({
  timestamp,
}) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

const getStartTimestampInYear = ({
  timestamp,
}) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  return new Date(year, 0, 1).getTime();
};

const getMonthListInYear = ({
  timestamp,
}) => {
  const list = new Array(NUMBER_OF_MONTH_IN_YEAR).fill(0);
  const startTimestampInYear = getStartTimestampInYear({ timestamp });
  let startTimestamp = startTimestampInYear;
  return list.map(() => {
    const interval = getDaysInMonth({ timestamp: startTimestamp }) - 1;
    const endTimestamp = startTimestamp + interval * DAY_IN_MILLISECONDS;
    const monthData = {
      startTimestamp,
      endTimestamp,
    };
    startTimestamp = endTimestamp + DAY_IN_MILLISECONDS;
    return monthData;
  });
};

const getDaysOffsetInMonth = ({ timestamp, endTimestamp }) => {
  const selectedDateOffset = new Date(timestamp).getDate();
  const lastDateInMonth = new Date(endTimestamp).getDate();
  const offset = selectedDateOffset < lastDateInMonth ? selectedDateOffset : lastDateInMonth;
  return offset - 1;
};

const getProperMonthInterval = ({
  timestamp,
  operation = 'increment',
}) => {
  const selectedDateObj = new Date(timestamp);
  const year = selectedDateObj.getFullYear();
  const month = selectedDateObj.getMonth();
  const targetMonth = operation === 'increment' ? month + 1 : month - 1;
  const targetDateBaseObj = new Date(year, targetMonth, 1);
  const selectedDateOffset = new Date(timestamp).getDate();
  const daysInTargetMonth = getDaysInMonth({ timestamp: targetDateBaseObj.getTime() });
  return daysInTargetMonth < selectedDateOffset
    ? targetDateBaseObj.setDate(daysInTargetMonth)
    : selectedDateObj.setMonth(targetMonth);
};

const getEdgeTimestampsInTenYears = ({
  timestamp,
}) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const lowerBound = year - (year % 10);
  const upperBound = 9 - (year % 10) + year;
  const lowerBoundTimestamp = new Date(lowerBound, 0, 1).getTime();
  const upperBoundDateTimestamp = new Date(upperBound, 0, 1).getTime();
  return {
    lowerBoundTimestamp,
    upperBoundDateTimestamp,
  };
};

const getStartTimestampInTenYear = ({
  timestamp,
  numberOfItems,
}) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const lowerBound = year - (year % 10);
  const lowerBoundTimestamp = new Date(lowerBound, 0, 1).getTime();
  const difference = numberOfItems - 10;
  if (difference <= 0) {
    return lowerBoundTimestamp;
  }
  const interval = Math.ceil(difference / 2);
  return {
    startTimestamp: new Date(lowerBound - interval, 0, 1).getTime(),
  };
};

const getYearListInTenYears = ({
  timestamp,
}) => {
  const NUMBER_OF_ITEMS = 12;
  const list = new Array(NUMBER_OF_ITEMS).fill(0);
  const {
    lowerBoundTimestamp,
    upperBoundDateTimestamp,
  } = getEdgeTimestampsInTenYears({ timestamp });
  const { startTimestamp } = getStartTimestampInTenYear({
    timestamp,
    numberOfItems: NUMBER_OF_ITEMS,
  });
  // const dateObj = new Date(timestamp);
  // const year = dateObj.getFullYear();
  // const lowerBoundYear = year - (year % 10);
  const startYear = new Date(startTimestamp).getFullYear();
  return list.map((elem, index) => {
    const targetTimestamp = new Date(startYear + index, 0, 1).getTime();
    return {
      color: lowerBoundTimestamp <= targetTimestamp && targetTimestamp <= upperBoundDateTimestamp
        ? color.dark
        : color.light,
      year: startYear + index,
      timestamp: targetTimestamp,
    };
  });
};

export {
  getDateListOfMonth,
  getTrimmedTodayTimestamp,
  getEdgeDateInMonthTimestamp,
  getMonthListInYear,
  getStartTimestampInYear,
  getDaysOffsetInMonth,
  getProperMonthInterval,
  getEdgeTimestampsInTenYears,
  getYearListInTenYears,
};
