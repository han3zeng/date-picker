import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  getEdgeTimestampsInTenYears,
  getYearListInTenYears,
}
from '../utils';
import { INTERVAL_MAP } from '../constants';
import { DataBox } from './Commons';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.gap || '20px 10px'};
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function Year({
  selected,
  color,
  year,
  onClickHandler
}) {
  return (
    <GridItem
      onClick={onClickHandler}
    >
      <DataBox
        colorType={color}
        selected={selected}
        isToday={false}
        size="55px"
      >
        {year}
      </DataBox>
    </GridItem>
  );
}

const YearComp = React.memo(Year);

function YearsGrid({
  setTimestamp,
  setInterval,
  timestamp: selectedTimestamp,
  gap,
}) {
  const {
    lowerBoundTimestamp,
  } = getEdgeTimestampsInTenYears({ timestamp: selectedTimestamp });
  const yearList = useMemo(() => getYearListInTenYears({
    timestamp: selectedTimestamp
  }), [ lowerBoundTimestamp ]);
  const content = yearList.map(({
    color,
    year,
    timestamp: targetTimestamp,
  }) => {
    const upperLimitForSelection = new Date(new Date(targetTimestamp).getFullYear(), 12, 0).getTime();
    return (
      <YearComp
        key={`${targetTimestamp}`}
        color={color}
        selected={
          (targetTimestamp <= selectedTimestamp)
          && (selectedTimestamp <= upperLimitForSelection)
        }
        year={year}
        onClickHandler={() => {
          const baseDate = new Date(selectedTimestamp);
          const targetDateObj = new Date(targetTimestamp);
          const targetYear = targetDateObj.getFullYear();
          const targetMonth = baseDate.getMonth();
          const targetDate = baseDate.getDate();
          const result = new Date(targetYear, targetMonth, targetDate).getTime();
          setTimestamp({
            timestamp: result,
          });
          setInterval(INTERVAL_MAP.month);
        }}
      />
    );
  });
  return (
    <Container
      gap={gap}
    >
      {content}
    </Container>
  );
}

export default YearsGrid;
