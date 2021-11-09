import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from './components/DatePicker';

const WrapperContainer = styled.div`
  margin: 50px auto 0 auto;
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const getFormattedNumber = ({
  number,
}) => {
  if (!Number.isNaN(number)) {
    return undefined;
  }
  if (number < 10) {
    return Number(`0${number}`);
  }
  return number;
};

function App() {
  const [selectedTimestamp, setTimestamp] = useState(new Date('2009-01-03 00:00:00').getTime());

  const onSelectHandler = ({
    timestamp,
  }) => {
    setTimestamp(timestamp);
  }

  return (
    <WrapperContainer>
      <DatePicker
        onSelect={onSelectHandler}
        timestamp={selectedTimestamp}
        gap={
          {
            datesGridGap: undefined,
            monthsGridGap: undefined,
            YearsGridGap: undefined,
          }
        }
      />
    </WrapperContainer>
  );
}

export default App;
