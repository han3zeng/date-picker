import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DatesGrid from './DatesGrid';
import MainController from './MainController';
import MonthsGrid from './MonthsGrid';
import YearsGrid from './YearsGrid';
import { INTERVAL_MAP } from '../constants';
import {
  getTrimmedTodayTimestamp,
} from '../utils';

const theme = {
  highlight: '#db3d44',
  textLight: '#cbcbcb',
  textNormal: '#333333',
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
};

const Container = styled.div`
  width: 100%;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 2px 3px #c8c8c8;
  border-radius: 3px;
  padding: 18px 13px;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
`;

function DatePicker({
  onSelect,
  timestamp,
  gap,
}) {
  const todayTimestamp = getTrimmedTodayTimestamp();
  const initialTimestamp = timestamp || todayTimestamp;
  const [selectedTimestamp, setTimestamp] = useState(initialTimestamp);
  const [interval, setInterval] = useState(INTERVAL_MAP.day);

  const content = (() => {
    const datesGridAbstract = (
      <DatesGrid
        setTimestamp={setTimestamp}
        todayTimestamp={todayTimestamp}
        selectedTimestamp={selectedTimestamp}
        gap={gap.datesGridGap}
        onSelect={onSelect}
      />
    );
    switch (interval) {
      case `${INTERVAL_MAP.day}`: {
        return datesGridAbstract;
      }
      case `${INTERVAL_MAP.month}`: {
        return (
          <MonthsGrid
            timestamp={selectedTimestamp}
            setTimestamp={setTimestamp}
            setInterval={setInterval}
            gap={gap.monthsGridGap}
          />
        );
      }
      case `${INTERVAL_MAP.year}`: {
        return (
          <YearsGrid
            timestamp={selectedTimestamp}
            setTimestamp={setTimestamp}
            setInterval={setInterval}
            gap={gap.YearsGridGap}
          />
        );
      }
      default: {
        return datesGridAbstract;
      }
    }
  })();

  return (
    <ThemeProvider
      theme={theme}
    >
      <Container>
        <MainController
          timestamp={selectedTimestamp}
          interval={interval}
          getNewTimestamp={({
            timestamp: newTimestamp,
          }) => {
            setTimestamp(newTimestamp);
          }}
          getNewInterval={({
            interval: newInterval,
          }) => {
            setInterval(newInterval);
          }}
        />
        {content}
      </Container>
    </ThemeProvider>
  );
}

export default DatePicker;
