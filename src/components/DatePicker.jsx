import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DatesGrid from './DatesGrid';
import MainController from './MainController';
import MonthsGrid from './MonthsGrid';
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
  height: 100%;
  max-width: 600px;
  max-height: 500px;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 2px 3px #c8c8c8;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.fontFamily};
`;

function DatePicker() {
  const todayTimestamp = getTrimmedTodayTimestamp();
  const [selectedTimestamp, setTimestamp] = useState(todayTimestamp);
  const [interval, setInterval] = useState(INTERVAL_MAP.day);

  const content = (() => {
    const datesGridAbstract = (
      <DatesGrid
        setTimestamp={setTimestamp}
        todayTimestamp={todayTimestamp}
        selectedTimestamp={selectedTimestamp}
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
          />
        );
      }
      case `${INTERVAL_MAP.year}`: {
        return (
          <div>year</div>
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
            timestamp,
          }) => {
            setTimestamp(timestamp);
          }}
          getNewInterval={({
            interval,
          }) => {
            setInterval(interval);
          }}
        />
        {content}
      </Container>
    </ThemeProvider>
  );
}

export default DatePicker;
