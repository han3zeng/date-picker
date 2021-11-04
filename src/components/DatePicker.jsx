import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { getDateListOfMonth, getTrimmedTodayTimestamp, getFirstDateInMonthTimestamp } from '../utils';

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

const DMYSContainer = styled.div`
  background-color: #f5f5f5;
`;

function DayMonthYearSelector() {
  return <DMYSContainer />;
}

const DatePickerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 500px;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 2px 3px #c8c8c8;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => {
    if (props.selected) {
      return 'white';
    }
    if (props.isToday) {
      return '#db3d44';
    }
    return props.colorType === 'light' ? '#cbcbcb' : '#333333';
  }};
`;

const Day = styled.div`
  color: black;
  font-weight: 700;
`;

const Date = styled.div`
  width: 30px;
  height: 30px;
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

function areEqual(prevProps, nextProps) {
  console.log(prevProps.monthIndex)
  console.log(nextProps.monthIndex)
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

const DatesComp = ({
  dateList,
  onDateClickHandler,
  todayTimestamp,
  monthIndex,
  selectedTimestamp,
}) => dateList.map(({
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

function DatePicker() {
  const todayTimestamp = getTrimmedTodayTimestamp();
  const [selectedTimestamp, setTimestamp] = useState(todayTimestamp);
  const monthIndex = getFirstDateInMonthTimestamp({
    timestamp: selectedTimestamp,
  })

  const dateList = useMemo(() => getDateListOfMonth({
    selectedTimestamp,
  }), [monthIndex]);

  const onDateClickHandler = ({ timestamp }) => {
    setTimestamp(timestamp);
  };

  return (
    <DatePickerContainer>
      <MemoDaysRow />
      <DatesComp
        dateList={dateList}
        onDateClickHandler={onDateClickHandler}
        todayTimestamp={todayTimestamp}
        monthIndex={monthIndex}
        selectedTimestamp={selectedTimestamp}
      />
    </DatePickerContainer>
  );
}


export default DatePicker;
