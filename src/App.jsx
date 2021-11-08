import React from 'react';
import styled from 'styled-components';
import DatePicker from './components/DatePicker';

const WrapperContainer = styled.div`
  margin: 50px auto 0 auto;
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <WrapperContainer>
      <DatePicker />
    </WrapperContainer>
  );
}

export default App;
