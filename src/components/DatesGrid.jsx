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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.gap || '20px 5px'};
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
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
      setTimestamp({
        timestamp,
        toClose: true,
      });
    }}
  >
    <DataBox
      colorType={color}
      selected={selected}
      isToday={isToday}
      size="35px"
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
      selected={(timestamp <= selectedTimestamp)
        && (selectedTimestamp <= timestamp + 23 * 60 * 60 * 1000 + 59 * 60 * 1000)}
      isToday={todayTimestamp === timestamp}
    />
  ));
};

function DatesGrid({
  setTimestamp,
  todayTimestamp,
  selectedTimestamp,
  gap,
}) {
  return (
    <Container
      gap={gap}
    >
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
