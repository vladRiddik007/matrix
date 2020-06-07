/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { getMatrix } from "./redux/actions";

import { Button } from "./components/button";

const App = ({ M, N, X, matrix, getMatrix }) => {
  let id = Symbol("ID");
  const [matri, setMatrix] = React.useState();
  const [row, setRow] = React.useState([]);

  useEffect(() => {
    getMatrix(createMatrix(M, N));
  }, []);

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function createMatrixRow(length) {
    return new Array(length).fill(0).map(() => ({
      [id]: Math.random(),
      amount: randomInteger(100, 999),
    }));
  }

  function createMatrix(row, column) {
    let mtx = [];
    for (let i = 0; i < row; i++) {
      mtx = [...mtx, createMatrixRow(column)];
    }
    return mtx;
  }

  function deleteItem(i) {
    const newMatrix = [...matrix.slice(0, i), ...matrix.slice(++i)];
    getMatrix(newMatrix);
  }

  function addRow() {
    const newRow = createMatrixRow(N);
    getMatrix([...matrix, newRow]);
  }

  function incrementAmount(i, j) {
    const newItem = matrix[i][j];
    newItem.amount += 1;
    const newMatrix = [
      ...matrix.slice(0, i),
      [...matrix[i].slice(0, j), { ...newItem }, ...matrix[i].slice(++j)],
      ...matrix.slice(++i),
    ];
    setMatrix(newMatrix);
  }

  const rowAmount = matrix.map((item) =>
    Math.round(item.reduce((sum, current) => sum + current.amount, 0))
  );

  const column = matrix
    .reduce((acc, item) => item.map((el, i) => el.amount + (acc[i] || 0)), [])
    .map((item) => Math.trunc(item / matrix.length));

  const onHover = (i, event) => {
    let newMatrix = [];
    if (event.type === "mouseenter") {
      setRow(matrix[i]);
      const percentMatrixItem = matrix[i].map((item) => {
        return {
          amount: item.amount,
          percent: +((item.amount * 100) / rowAmount[i]).toFixed(1),
        };
      });
      newMatrix = [
        ...matrix.slice(0, i),
        [...percentMatrixItem],
        ...matrix.slice(++i),
      ];
    } else {
      newMatrix = [...matrix.slice(0, i), row, ...matrix.slice(++i)];
    }
    setMatrix(newMatrix);
  };

  function getClosest(number, step, event) {
    let newMatrix = [];
    const sortMatrix = [
      ...new Set(matrix.flat().map((item) => item.amount)),
    ].sort((a, b) => a - b);
    const index = sortMatrix.indexOf(number);
    const right = [];
    for (let i = 0; i <= Math.floor(step / 2); i++) {
      right[i] = sortMatrix[index + i];
    }
    const left = [];
    for (let i = 0; i <= Math.ceil(step / 2); i++) {
      left[i] = sortMatrix[index - i];
    }
    const around = [...new Set(left.concat(right))];
    const indexUndefined = around.indexOf(undefined);
    if (indexUndefined !== -1) {
      around.splice(indexUndefined, 1);
    }
    if (event.type === "mouseenter") {
      setRow(matrix);
      newMatrix = matrix.map((row) => {
        return row.map((item) => {
          for (let i = 0; i < around.length; i++) {
            if (item.amount === around[i]) {
              item = {
                amount: item.amount,
                size: 30,
              };
            }
          }
          return item;
        });
      });
    } else {
      newMatrix = row;
    }
    setMatrix(newMatrix);
  }

  return (
    <Container>
      {!matrix.length && <h2>Game over</h2>}
      <TableStyled>
        <tbody>
          {rowAmount.map((item, i) => (
            <tr
              key={i}
              onMouseEnter={(event) => onHover(i, event)}
              onMouseLeave={(event) => onHover(i, event)}
            >
              <TdStyled backgroundColor="rgb(103, 237, 247)">{item}</TdStyled>
            </tr>
          ))}
        </tbody>
      </TableStyled>
      <TableStyled>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <TdStyled
                  key={j}
                  onClick={() => incrementAmount(i, j)}
                  onMouseEnter={(event) => getClosest(col.amount, X, event)}
                  onMouseLeave={(event) => getClosest(col.amount, X, event)}
                  backgroundImage={col.percent}
                  size={col.size}
                  hover
                >
                  {col.percent ? col.percent + "%" : col.amount}
                </TdStyled>
              ))}
              <td>
                <Button onClick={() => deleteItem(i)} backgroundColor="red">
                  &#215;
                </Button>
              </td>
              <td>
                <Button onClick={() => addRow()} backgroundColor="yellow">
                  +
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <TfootStyled>
          <tr>
            {column.map((item, i) => (
              <TdStyled key={i}>{item}</TdStyled>
            ))}
          </tr>
        </TfootStyled>
      </TableStyled>
    </Container>
  );
};

const mapDispatchToProps = {
  getMatrix,
};

const mapStateToProps = (state) => ({
  matrix: state.matrix,
  M: state.row,
  N: state.column,
  X: state.step,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Container = styled.div`
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
`;

const TableStyled = styled.table`
  margin: 0;
  border-spacing: 15px;
  /* width: 100%; */
  /* font-family: arial, sans-serif; */
  /* border-collapse: collapse; */
`;

const TdStyled = styled.td`
  cursor: pointer;
  text-align: center;
  border-bottom: 3px solid transparent;
  width: 70px;
  height: 60px;
  background-color: ${({ backgroundColor }) => backgroundColor || "none"};
  background-image: ${({ backgroundImage }) =>
    backgroundImage
      ? `linear-gradient(to top,rgb(103, 237, 247) ${backgroundImage}%, rgba(255, 255, 255, 0) ${backgroundImage}%, rgba(255, 255, 255, 0) 100%, rgb(103, 237, 247) 100%)`
      : "none"};
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

const TfootStyled = styled.tfoot`
  background-color: rgb(148, 218, 116);
`;
