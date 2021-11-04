import React from 'react';
import styled from 'styled-components';
import { GridItem } from './Commons';

const Day = styled.div`
  color: black;
  font-weight: 700;
`;

const Days = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
};
Object.freeze(Days);

const MemoDaysRow = React.memo(() => {
  const days = Object.keys(Days).map((dayIndex, index) => (
    <GridItem
      key={`${Days[dayIndex]}-${index}`}
    >
      <Day>
        {Days[dayIndex]}
      </Day>
    </GridItem>
  ));
  return <>{days}</>;
});

export default MemoDaysRow;
