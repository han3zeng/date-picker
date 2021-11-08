import React from 'react';
import styled from 'styled-components';
import { INTERVAL_MAP, NUMBER_TO_MONTH } from '../constants';
import { getProperMonthInterval } from '../utils';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  margin-bottom: 30px;
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
  cursor: pointer;
`;

function onNextClickHandler({
  interval,
  timestamp,
}) {
  switch (interval) {
    case `${INTERVAL_MAP.day}`: {
      return getProperMonthInterval({
        timestamp,
        operaction: 'increment',
      });
    }
    case `${INTERVAL_MAP.month}`: {
      const dateObj = new Date(timestamp);
      dateObj.setFullYear(dateObj.getFullYear() + 1);
      return dateObj.getTime();
    }
    case `${INTERVAL_MAP.year}`: {
      const dateObj = new Date(timestamp);
      dateObj.setFullYear(dateObj.getFullYear() + 10);
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
    case `${INTERVAL_MAP.day}`: {
      return getProperMonthInterval({
        timestamp,
        operation: 'decrement',
      });
    }
    case `${INTERVAL_MAP.month}`: {
      const dateObj = new Date(timestamp);
      dateObj.setFullYear(dateObj.getFullYear() - 1);
      return dateObj.getTime();
    }
    case `${INTERVAL_MAP.year}`: {
      const dateObj = new Date(timestamp);
      dateObj.setFullYear(dateObj.getFullYear() - 10);
      return dateObj.getTime();
    }
    default:
      throw new Error();
  }
}

function onMainClickHandler({
  getNewInterval,
  interval,
}) {
  if (INTERVAL_MAP.day === interval) {
    getNewInterval({
      interval: INTERVAL_MAP.month,
    });
  }
  if (INTERVAL_MAP.month === interval) {
    getNewInterval({
      interval: INTERVAL_MAP.year,
    });
  }
}

function Content({
  interval,
  timestamp,
  getNewInterval,
}) {
  const dateObj = new Date(timestamp);
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  let content = null;
  switch (interval) {
    case `${INTERVAL_MAP.day}`: {
      content = (<div>{`${NUMBER_TO_MONTH[month]} ${year}`}</div>);
      break;
    }
    case `${INTERVAL_MAP.month}`: {
      content = (<div>{`${year}`}</div>);
      break;
    }
    case `${INTERVAL_MAP.year}`: {
      const upperBound = 9 - (year % 10) + year;
      const lowerBound = year - (year % 10);
      content = (<div>{`${lowerBound} - ${upperBound}`}</div>);
      break;
    }
    default:
      content = (<div>error</div>);
      break;
  }
  return (
    <Info
      role="button"
      onClick={() => {
        onMainClickHandler({
          interval,
          getNewInterval,
        });
      }}
      onKeyDown={() => {}}
    >
      {content}
    </Info>
  );
}


function MainController({
  timestamp,
  interval,
  getNewTimestamp,
  getNewInterval,
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
        getNewInterval={getNewInterval}
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
