import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import DatesGrid from './DatesGrid';
import MainController from './MainController';
import { IntervalMap } from '../constants';
import {
  getTrimmedTodayTimestamp,
} from '../utils';

// const DMYSContainer = styled.div`
//   background-color: #f5f5f5;
// `;

// function DayMonthYearSelector() {
//   return <DMYSContainer />;
// }

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 500px;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 2px 3px #c8c8c8;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
`;

function DatePicker() {
  const todayTimestamp = getTrimmedTodayTimestamp();
  const [selectedTimestamp, setTimestamp] = useState(todayTimestamp);
  const [interval, setInterval] = useState(IntervalMap.day);

  const onDateClickHandler = ({ timestamp }) => {
    setTimestamp(timestamp);
  };

  const content = (() => {
    switch (interval) {
      case `${IntervalMap.day}`: {
        return (
          <DatesGrid
            onDateClickHandler={onDateClickHandler}
            todayTimestamp={todayTimestamp}
            selectedTimestamp={selectedTimestamp}
          />
        );
      }
      case `${IntervalMap.month}`: {
        return (
          <div>month</div>
        );
      }
      case `${IntervalMap.year}`: {
        return (
          <div>year</div>
        );
      }
      default: {
        return (
          <DatePickerContainer>
            <DaysRow />
            <DatesGrid
              onDateClickHandler={onDateClickHandler}
              todayTimestamp={todayTimestamp}
              selectedTimestamp={selectedTimestamp}
            />
          </DatePickerContainer>
        );
      }
    }
  })();

  return (
    <Container>
      <MainController
        timestamp={selectedTimestamp}
        interval={interval}
        getNewTimestamp={({
          timestamp,
        }) => {
          onDateClickHandler({
            timestamp,
          });
        }}
        getNewInterval={({
          interval,
        }) => {
          setInterval(interval);
        }}
      />
      {content}
    </Container>
  );
}

export default DatePicker;
