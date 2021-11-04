import React, { useState } from 'react';
import styled from 'styled-components';
import { getDateListOfMonth } from '../utils';

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
  max-width: 600px;
  width: 100%;
  height: 500px;
  border: 1px solid #c8c8c8;
  box-shadow: 0px 2px 3px #c8c8c8;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
`;

const SquareElem = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
`;

const DayRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function DatePicker() {
  const [selectedTimestamp, setTimestamp] = useState(Date?.now());
  const dateList = getDateListOfMonth({});
  const FirstRow = () => {
    const days = Object.keys(Days).map((dayIndex, index) => (
      <SquareElem
        key={`${Days[dayIndex]}-${index}`}
      >
        {Days[dayIndex]}
      </SquareElem>
    ));
    return <Row>{days}</Row>;
  };
  const Rows = () => dateList.map((row, index) => {
    const contet = row.map((elem, index) => <SquareElem>{elem.date}</SquareElem>);
    return <Row>{contet}</Row>;
  });

  return (
    <DatePickerContainer>
      <FirstRow />
      <Rows />
    </DatePickerContainer>
  );
}

const WrapperContainer = styled.div`
  margin: 50px auto 0 auto;
  width: 400px;
  display: flex;
  justify-content: center;
`;

const Wrapper = () => (
  <WrapperContainer>
    <DatePicker />
  </WrapperContainer>
);

export default Wrapper;
