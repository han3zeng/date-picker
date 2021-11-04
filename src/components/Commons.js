import styled from 'styled-components';

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

export {
  GridItem,
};
