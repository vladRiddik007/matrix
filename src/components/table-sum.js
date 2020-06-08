import React, { useEffect } from "react";
import { connect } from "react-redux";
import { TableStyled, TdStyled } from "./table.styled";
import { Button } from "./button";
import * as actions from "../redux/actions";

const TableSum = ({ sumRowThank, addNewRow, hoverSum, rowSum, N, matrix}) => {
  useEffect(() => {
    sumRowThank(matrix);
  }, [matrix, sumRowThank]);
  return (
    <TableStyled>
      <tbody>
        {rowSum.map((item, i) => (
          <tr
            key={i}
            onMouseEnter={(event) => hoverSum(i, event)}
            onMouseLeave={(event) => hoverSum(i, event)}
          >
            <TdStyled backgroundColor="rgb(103, 237, 247)">{item}</TdStyled>
          </tr>
        ))}
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

const mapStateToProps = (state) => ({
  matrix: state.matrix,
  rowSum: state.rowSum,
  N: state.column,
});

export default connect(mapStateToProps, actions)(TableSum);
