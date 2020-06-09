import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TableStyled, TdStyled, TfootStyled, Text } from './table.styled';
import { Button } from './button';
import * as actions from '../redux/actions';

const TableMain = ({
  M,
  N,
  X,
  createNewMatrix,
  matrix,
  copyMatrix,
  incrementItem,
  deleteRow,
  averageValueColumn,
  averageValueColumnThank,
  hoverItemThank,
}) => {
  useEffect(() => {
    createNewMatrix(M, N);
  }, [M, N, createNewMatrix]);
  useEffect(() => {
    averageValueColumnThank(matrix);
  }, [averageValueColumnThank, matrix]);

  const renderTbody = arr =>
    arr.map((row, i) => (
      <tr key={i}>
        {row.map((col, j) => (
          <TdStyled
            key={j}
            onClick={() => incrementItem(i, j)}
            onMouseEnter={event =>
              hoverItemThank(col.amount, event, arr, X, copyMatrix)
            }
            onMouseLeave={event =>
              hoverItemThank(col.amount, event, arr, X, copyMatrix)
            }
            backgroundImage={col.percent}
            size={col.size}
            hover
          >
            {col.percent ? col.percent + '%' : col.amount}
          </TdStyled>
        ))}
        <td>
          <Button onClick={() => deleteRow(i)} backgroundColor="red">
            &#215;
          </Button>
        </td>
      </tr>
    ));

  return (
    <>
      {!!matrix.length || <Text>Game over</Text>}
      <TableStyled>
        <tbody>
          {renderTbody(matrix)}
        </tbody>
        <TfootStyled>
          <tr>
            {averageValueColumn.map((item, i) => (
              <TdStyled key={i}>{item}</TdStyled>
            ))}
          </tr>
        </TfootStyled>
      </TableStyled>
    </>
  );
};

const mapStateToProps = state => ({
  M: state.row,
  N: state.column,
  X: state.step,
  copyMatrix: state.copyMatrix,
  matrix: state.matrix,
  averageValueColumn: state.averageValueColumn,
});

export default connect(mapStateToProps, actions)(TableMain);
