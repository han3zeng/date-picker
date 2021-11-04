import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import DaysRow from './DaysRow';
import DatesGrid from './DatesGrid';
import {
  getDateListOfMonth,
  getTrimmedTodayTimestamp,
  getFirstDateInMonthTimestamp,
} from '../utils';

// const DMYSContainer = styled.div`
//   background-color: #f5f5f5;
// `;

// function DayMonthYearSelector() {
//   return <DMYSContainer />;
// }

const DatePickerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 500px;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 2px 3px #c8c8c8;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

function DatePicker() {
  const todayTimestamp = getTrimmedTodayTimestamp();
  const [selectedTimestamp, setTimestamp] = useState(todayTimestamp);
  const monthIndex = getFirstDateInMonthTimestamp({
    timestamp: selectedTimestamp,
  });

  const dateList = useMemo(() => getDateListOfMonth({
    selectedTimestamp,
  }), [monthIndex]);

  const onDateClickHandler = ({ timestamp }) => {
    setTimestamp(timestamp);
  };

  return (
    <DatePickerContainer>
      <DaysRow />
      <DatesGrid
        dateList={dateList}
        onDateClickHandler={onDateClickHandler}
        todayTimestamp={todayTimestamp}
        monthIndex={monthIndex}
        selectedTimestamp={selectedTimestamp}
      />
    </DatePickerContainer>
  );
}

export default DatePicker;
