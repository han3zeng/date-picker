import React, { useMemo } from 'react';
import styled from 'styled-components';
import DaysRow from './DaysRow';
import { DataBox } from './Commons';
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

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  setTimestamp,
  monthIndex,
  selected,
}) => (
  <GridItem
    onClick={() => {
      setTimestamp(timestamp);
    }}
  >
    <DataBox
      colorType={color}
      selected={selected}
      isToday={isToday}
    >
      {date}
    </DataBox>
  </GridItem>
), areEqual);

const Grid = ({
  setTimestamp,
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
      setTimestamp={setTimestamp}
      todayTimestamp={todayTimestamp}
      monthIndex={monthIndex}
      selected={selectedTimestamp === timestamp}
      isToday={todayTimestamp === timestamp}
    />
  ));
};

function DatesGrid({
  setTimestamp,
  todayTimestamp,
  selectedTimestamp
}) {
  return (
    <Container>
      <DaysRow />
      <Grid
        setTimestamp={setTimestamp}
        todayTimestamp={todayTimestamp}
        selectedTimestamp={selectedTimestamp}
      />
    </Container>
  );
}

export default DatesGrid;
