import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TableStyled, TdStyled } from './table.styled';
import { Button } from './button';
import * as actions from '../redux/actions';

const TableSum = ({
  sumRowThank,
  addNewRow,
  rowSum,
  N,
  matrix,
  copyMatrix,
  hoverSumThank,
}) => {
  useEffect(() => {
    sumRowThank(matrix);
  }, [matrix, sumRowThank]);

  const rebderTr = (arr) =>
    arr.map((item, i) => (
      <tr
        key={i}
        onMouseEnter={event =>
          hoverSumThank(i, event, matrix, copyMatrix, rowSum)
        }
        onMouseLeave={event =>
          hoverSumThank(i, event, matrix, copyMatrix, rowSum)
        }
      >
        <TdStyled backgroundColor="rgb(103, 237, 247)">{item}</TdStyled>
      </tr>
    ));

  return (
    <TableStyled>
      <tbody>
        {rebderTr(rowSum)}
        <tr>
          <td>
            <Button onClick={() => addNewRow(N)} backgroundColor="yellow">
              +
            </Button>
          </td>
        </tr>
      </tbody>
    </TableStyled>
  );
};

const mapStateToProps = state => ({
  matrix: state.matrix,
  rowSum: state.rowSum,
  N: state.column,
  copyMatrix: state.copyMatrix,
});

export default connect(mapStateToProps, actions)(TableSum);
