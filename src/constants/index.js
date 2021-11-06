const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const AMOUNT_IN_CALENDAR = 42;
const NUMBER_OF_MONTH_IN_YEAR = 12;

const INTERVAL_MAP = {
  day: 'day',
  month: 'month',
  year: 'year',
};
Object.freeze(INTERVAL_MAP);

const NUMBER_TO_MONTH = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};
Object.freeze(NUMBER_TO_MONTH);

export {
  INTERVAL_MAP,
  NUMBER_TO_MONTH,
  DAY_IN_MILLISECONDS,
  AMOUNT_IN_CALENDAR,
  NUMBER_OF_MONTH_IN_YEAR,
};
