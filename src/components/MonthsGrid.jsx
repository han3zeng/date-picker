import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getMonthListInYear, getStartTimestampInYear } from '../utils';
import { NUMBER_TO_MONTH } from '../constants';
import { DataBox } from './Commons';

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function Month({
  selected,
  month,
  setTimestamp
}) {
  return (
    <GridItem
      onClick={setTimestamp}
    >
      <DataBox
        colorType="dark"
        selected={selected}
        isToday={false}
      >
        {NUMBER_TO_MONTH[month]}
      </DataBox>
    </GridItem>
  )
}

const MonthComp = React.memo(Month)


function MonthsGrid({
  setTimestamp,
  timestamp
}) {
  const yearIndex = getStartTimestampInYear({ timestamp });
  const monthList = useMemo(() => getMonthListInYear({ timestamp }), [ yearIndex ]);
  const content = monthList.map(({
    startTimestamp,
    endTimestamp,
  }, index) => (
    <MonthComp
      key={`${startTimestamp}-${endTimestamp}`}
      selected={startTimestamp <= timestamp && timestamp <= endTimestamp}
      month={index + 1}
      setTimestamp={() => {
        setTimestamp(startTimestamp);
      }}
    />
  ));
  return (
    <Container>
      {content}
    </Container>
  );
}

export default MonthsGrid;
