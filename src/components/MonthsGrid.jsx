import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getMonthListInYear, getStartTimestampInYear, getDaysOffsetInMonth } from '../utils';
import { NUMBER_TO_MONTH, INTERVAL_MAP, DAY_IN_MILLISECONDS } from '../constants';
import { DataBox } from './Commons';

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px 5px;
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
  onClickHandler
}) {
  return (
    <GridItem
      onClick={onClickHandler}
    >
      <DataBox
        colorType="dark"
        selected={selected}
        isToday={false}
        size="45px"
      >
        {NUMBER_TO_MONTH[month]}
      </DataBox>
    </GridItem>
  );
}

const MonthComp = React.memo(Month)


function MonthsGrid({
  setTimestamp,
  setInterval,
  timestamp,
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
      onClickHandler={() => {
        const targetTimestamp = startTimestamp + getDaysOffsetInMonth({
          endTimestamp,
          timestamp,
        }) * DAY_IN_MILLISECONDS;
        setTimestamp(targetTimestamp);
        setInterval(INTERVAL_MAP.day);
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
