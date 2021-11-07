import {
  DAY_IN_MILLISECONDS,
  AMOUNT_IN_CALENDAR,
  NUMBER_OF_MONTH_IN_YEAR,
} from '../constants';

const color = {
  light: 'light',
  dark: 'dark',
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

export {
  getDateListOfMonth,
  getTrimmedTodayTimestamp,
  getEdgeDateInMonthTimestamp,
  getMonthListInYear,
  getStartTimestampInYear,
  getDaysOffsetInMonth,
  getProperMonthInterval,
};
