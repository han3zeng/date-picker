import React from 'react';
import DatePicker from './components/DatePicker';
import styled from 'styled-components';


const WrapperContainer = styled.div`
  margin: 50px auto 0 auto;
  max-width: 400px;
  width: 100%;
  height: 400px;
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
