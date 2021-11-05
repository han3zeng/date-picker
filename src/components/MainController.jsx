import React from 'react';
import styled from 'styled-components';
import { IntervalMap } from '../constants';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

const Arrow = styled.div`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  margin: 0 3px;
  cursor: pointer;
  transform: ${(props) => (props.left ? 'rotate(135deg)' : 'rotate(-45deg)')};
`;

const Info = styled.div`

`;

const numberToMonth = {
  1: 'Jan.',
  2: 'Feb.',
  3: 'Mar.',
  4: 'Apr.',
  5: 'May.',
  6: 'Jun.',
  7: 'Jul.',
  8: 'Aug.',
  9: 'Sep.',
  10: 'Oct.',
  11: 'Nov.',
  12: 'Dec.',
};

function onNextClickHandler({
  interval,
  timestamp,
}) {
  switch (interval) {
    case `${IntervalMap.day}`:
      return timestamp + 24 * 60 * 60 * 1000;
    case `${IntervalMap.month}`: {
      const dateObj = new Date(timestamp);
      dateObj.setMonth(dateObj.getMonth() + 1);
      return dateObj.getTime();
    }
    case `${IntervalMap.year}`: {
      const dateObj = new Date(timestamp);
      dateObj.setFullYear(dateObj.getFullYear() + 1);
      return dateObj.getTime();
    }
    default:
      throw new Error();
  }
}

function onPreivousClickHandler({
  interval,
  timestamp,
}) {
  switch (interval) {
    case `${IntervalMap.day}`:
      return timestamp - 24 * 60 * 60 * 1000;
    case `${IntervalMap.month}`: {
      const dateObj = new Date(timestamp);
      dateObj.setMonth(dateObj.getMonth() - 1);
      return dateObj.getTime();
    }
    case `${IntervalMap.year}`: {
      const dateObj = new Date(timestamp);
      dateObj.setFullYear(dateObj.getFullYear() - 1);
      return dateObj.getTime();
    }
    default:
      throw new Error();
  }
}

function onMainClickHandler () {

}

function Content({
  interval,
  timestamp
}) {
  const dateObj = new Date(timestamp);
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  switch (interval) {
    case `${IntervalMap.day}`: {
      return (<Info>{`${numberToMonth[month]} ${year}`}</Info>);
    }
    case `${IntervalMap.month}`: {
      return (<Info>{`${year}`}</Info>);
    }
    case `${IntervalMap.year}`: {
      const upperBound = 9 - (year % 10) + year;
      const lowerBound = year - (year % 10);
      return (<Info>{`${lowerBound} - ${upperBound}`}</Info>);
    }
    default:
      return <div>error</div>;
  }
}


function MainController({
  timestamp,
  interval,
  getNewTimestamp
}) {
  return (
    <Container>
      <Arrow
        left
        onClick={() => {
          const newTimestamp = onPreivousClickHandler({
            interval,
            timestamp,
          });
          getNewTimestamp({
            timestamp: newTimestamp,
          });
        }}
      />
      <Content
        timestamp={timestamp}
        interval={interval}
      />
      <Arrow
        onClick={() => {
          const newTimestamp = onNextClickHandler({
            interval,
            timestamp,
          });
          getNewTimestamp({
            timestamp: newTimestamp,
          });
        }}
      />
    </Container>
  );
}

export default MainController;
