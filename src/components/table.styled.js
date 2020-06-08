import styled, { css } from 'styled-components';

export const TableStyled = styled.table`
  margin: 0;
  border-spacing: 15px;
`;

export const TdStyled = styled.td`
  cursor: pointer;
  text-align: center;
  border-bottom: 3px solid transparent;
  width: 70px;
  height: 60px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
  background-image: ${({ backgroundImage }) =>
    backgroundImage
      ? `linear-gradient(to top,rgb(103, 237, 247) ${backgroundImage}%, rgba(255, 255, 255, 0) ${backgroundImage}%, rgba(255, 255, 255, 0) 100%, rgb(103, 237, 247) 100%)`
      : 'none'};
  ${({ hover, size }) =>
    hover &&
    css`
      font-size: ${size}px;
      :hover {
        border-bottom: 3px solid green;
        font-size: 30px;
      }
    `}
`;

export const TfootStyled = styled.tfoot`
  background-color: rgb(148, 218, 116);
`;

export const Text = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;
