import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DatePicker from './components/DatePicker';
import {
  debounce,
  timestampToDateString,
  getTrimmedTodayTimestamp,
} from './utils';
import { breakpoints } from './config';

const theme = {
  focus: '#72aedb',
  caption: '#666666',
  highlight: '#db3d44',
  textLight: '#cbcbcb',
  textNormal: '#333333',
  borderGray: '#c8c8c8',
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
};

const Container = styled.div`
  position: relative;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  display: inline-block;
`;

const DatePickerContainer = styled.div`
  max-width: 300px;
  width: 100%;
  left: 0;
  z-index: 1;
  background-color: white;
  @media(max-width: ${breakpoints.maxMobile}px) {
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    max-width: 100%;
  };
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  > span {
    font-size: 12px;
    color: ${(props) => (props.error === '' ? props.theme.caption : 'red')};
  }
`;

const InputField = styled.input`
  position: relative;
  border: 1px solid ${(props) => (props.error === '' ? props.theme.borderGray : 'red')};
  height: 25px;
  border-radius: 3px;
  outline: none;
  &:focus {
    border-color: ${(props) => (props.error === '' ? props.theme.borderGray : 'red')};
    box-shadow: ${(props) => {
    if (props.error !== '') {
      return 'none';
    }
    return `0px 0px 4px ${props.theme.focus}`;
  }};
  }
`;

function App() {
  const [selectedTimestamp, setTimestamp] = useState(getTrimmedTodayTimestamp());
  const [ifShowModal, toggleModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputEl = useRef(null);

  const onSelectHandler = ({
    timestamp,
    toClose = false,
  }) => {
    setTimestamp(timestamp);
    inputEl.current.value = timestampToDateString({ timestamp });
    if (ifShowModal && toClose) {
      toggleModal(false);
    }
  };

  const onChangeHandler = debounce(() => {
    if (!inputEl) {
      return;
    }
    const targetValue = inputEl?.current.value;
    const timestamp = Date.parse(targetValue);
    if (targetValue === '') {
      const todayTimestamp = getTrimmedTodayTimestamp();
      setTimestamp(todayTimestamp);
      setErrorMessage('');
    } else if (!Number.isNaN(timestamp)) {
      setTimestamp(timestamp);
      setErrorMessage('');
    } else {
      setErrorMessage('invalid date string');
    }
  }, 200);

  return (
    <ThemeProvider
      theme={theme}
    >
      <Container>
        <InputContainer
          error={errorMessage}
        >
          {errorMessage ? <span>{errorMessage}</span> : <span>format: yyyy-mm-dd</span>}
          <InputField
            error={errorMessage}
            onChange={onChangeHandler}
            onFocus={() => {
              if (!ifShowModal) {
                toggleModal(true);
              }
            }}
            ref={inputEl}
          />
        </InputContainer>
        {ifShowModal
          && (
            <DatePickerContainer
              arial-label="DatePickerContainer"
            >
              <DatePicker
                arial-label="DatePicker"
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
            </DatePickerContainer>
          )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
