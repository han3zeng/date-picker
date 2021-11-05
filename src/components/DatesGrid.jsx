import React, { useMemo } from 'react';
import styled from 'styled-components';
import { GridItem } from './Commons';
import DaysRow from './DaysRow';
import {
  getDateListOfMonth,
  getEdgeDateInMonthTimestamp,
} from '../utils';

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

const Date = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: ${(props) => {
    if (props.selected) {
      return 'white';
    }
    if (props.isToday) {
      return '#db3d44';
    }
    return props.colorType === 'light' ? '#cbcbcb' : '#333333';
  }};
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? '#db3d44' : 'initial')};
`;

function areEqual(prevProps, nextProps) {
  if (prevProps.monthIndex !== nextProps.monthIndex) {
    return false;
  }
  if (prevProps.selected && !nextProps.selected) {
    return false;
  }
  if (!prevProps.selected && nextProps.selected) {
    return false;
  }
  return true;
}

const DateElement = React.memo(({
  timestamp,
  color,
  isToday,
  date,
  onDateClickHandler,
  monthIndex,
  selected,
}) => (
  <GridItem
    onClick={() => {
      onDateClickHandler({
        timestamp,
      });
    }}
  >
    <Date
      colorType={color}
      selected={selected}
      isToday={isToday}
    >
      {date}
    </Date>
  </GridItem>
), areEqual);

const Grid = ({
  onDateClickHandler,
  todayTimestamp,
  selectedTimestamp,
}) => {
  const monthIndex = getEdgeDateInMonthTimestamp({
    timestamp: selectedTimestamp,
    when: 'firstDate',
  });

  const dateList = useMemo(() => getDateListOfMonth({
    selectedTimestamp,
  }), [monthIndex]);

  return dateList.map(({
    date,
    color,
    timestamp,
  }) => (
    <DateElement
      key={timestamp}
      date={date}
      timestamp={timestamp}
      color={color}
      onDateClickHandler={onDateClickHandler}
      todayTimestamp={todayTimestamp}
      monthIndex={monthIndex}
      selected={selectedTimestamp === timestamp}
      isToday={todayTimestamp === timestamp}
    />
  ));
};

function DatesGrid({
  onDateClickHandler,
  todayTimestamp,
  selectedTimestamp
}) {
  return (
    <Container>
      <DaysRow />
      <Grid
        onDateClickHandler={onDateClickHandler}
        todayTimestamp={todayTimestamp}
        selectedTimestamp={selectedTimestamp}
      />
    </Container>
  );
}

export default DatesGrid;
