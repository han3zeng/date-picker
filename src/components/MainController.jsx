import React from 'react';
import styled from 'styled-components';
import { IntervalMap, NUMBER_TO_MONTH } from '../constants';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
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

function onMainClickHandler({
  getNewInterval,
  interval,
}) {
  if (IntervalMap.day === interval) {
    getNewInterval({
      interval: IntervalMap.month,
    });
  }
  if (IntervalMap.month === interval) {
    getNewInterval({
      interval: IntervalMap.year,
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
    case `${IntervalMap.day}`: {
      content = (<div>{`${NUMBER_TO_MONTH[month]} ${year}`}</div>);
      break;
    }
    case `${IntervalMap.month}`: {
      content = (<div>{`${year}`}</div>);
      break;
    }
    case `${IntervalMap.year}`: {
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
