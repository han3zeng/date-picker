import React, { useState } from 'react';
import styled from 'styled-components';
import DatesGrid from './DatesGrid';
import MainController from './MainController';
import MonthsGrid from './MonthsGrid';
import YearsGrid from './YearsGrid';
import { INTERVAL_MAP } from '../constants';
import {
  getTrimmedTodayTimestamp,
} from '../utils';

const Container = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderGray};
  box-shadow: 0px 2px 3px ${(props) => props.theme.borderGray};
  border-radius: 3px;
  padding: 18px 13px;
  box-sizing: border-box;
`;

function DatePicker({
  setTimestamp,
  timestamp,
  gap,
}) {
  const todayTimestamp = getTrimmedTodayTimestamp();
  const [interval, setInterval] = useState(INTERVAL_MAP.day);

  const content = (() => {
    const datesGridAbstract = (
      <DatesGrid
        setTimestamp={setTimestamp}
        todayTimestamp={todayTimestamp}
        selectedTimestamp={timestamp}
        gap={gap.datesGridGap}
      />
    );
    switch (interval) {
      case `${INTERVAL_MAP.day}`: {
        return datesGridAbstract;
      }
      case `${INTERVAL_MAP.month}`: {
        return (
          <MonthsGrid
            timestamp={timestamp}
            setTimestamp={setTimestamp}
            setInterval={setInterval}
            gap={gap.monthsGridGap}
          />
        );
      }
      case `${INTERVAL_MAP.year}`: {
        return (
          <YearsGrid
            timestamp={timestamp}
            setTimestamp={setTimestamp}
            setInterval={setInterval}
            gap={gap.yearsGridGap}
          />
        );
      }
      default: {
        return datesGridAbstract;
      }
    }
  })();

  return (
    <Container>
      <MainController
        timestamp={timestamp}
        interval={interval}
        getNewTimestamp={({
          timestamp: newTimestamp,
        }) => {
          setTimestamp({
            timestamp: newTimestamp,
          });
        }}
        getNewInterval={({
          interval: newInterval,
        }) => {
          setInterval(newInterval);
        }}
      />
      {content}
    </Container>
  );
}

export default DatePicker;
