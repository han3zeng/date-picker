import styled from 'styled-components';

const DataBox = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: ${(props) => {
    if (props.selected) {
      return 'white';
    }
    if (props.isToday) {
      return `${props.theme.highlight}`;
    }
    return props.colorType === 'light' ? `${props.theme.textLight}` : `${props.theme.textNormal}`;
  }};
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? `${props.theme.highlight}` : 'initial')};
`;

export {
  DataBox,
};
