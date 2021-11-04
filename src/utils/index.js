const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const AMOUNT_IN_CALENDAR = 42;

const color = {
  light: 'light',
  dark: 'dark',
};

const dateTrimmer = ({ timestamp }) => {
  const DateObj = new Date(timestamp);
  DateObj?.setHours(0, 0, 0);
  return new Date(DateObj?.getTime());
};

const getEssentialTimestamps = ({ dateObj }) => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const firstDateInMonthObj = new Date(year, month, 1);
  const lastDateInMonthObj = new Date(year, month + 1, 0);
  const firstDayInMonth = firstDateInMonthObj.getDay();
  return {
    firstDateInMonthTimestamp: firstDateInMonthObj.getTime(),
    lastDateInMonthTimestamp: lastDateInMonthObj.getTime(),
    startTimestamp: firstDateInMonthObj.getTime() - firstDayInMonth * DAY_IN_MILLISECONDS,
  };
};

const getDateListOfMonth = ({ selectedTimestamp = 1635947480743 }) => {
  const dateObj = dateTrimmer({
    timestamp: selectedTimestamp,
  });
  const {
    startTimestamp,
    firstDateInMonthTimestamp,
    lastDateInMonthTimestamp,
  } = getEssentialTimestamps({
    dateObj,
  });
  const list = [];
  for (let i = 0; i < 6; i += 1) {
    const row = [];
    for (let j = 0; j < 7; j += 1) {
      const timestamp = startTimestamp + (i * 7 + j) * DAY_IN_MILLISECONDS;
      const data = {
        timestamp,
        date: new Date(timestamp).getDate(),
        color:
          firstDateInMonthTimestamp <= timestamp && timestamp <= lastDateInMonthTimestamp
            ? color.dark
            : color.light,
      };
      row.push(data);
    }
    list.push(row);
  }
  return list;
};

export { getDateListOfMonth };
