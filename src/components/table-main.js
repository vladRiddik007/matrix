// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { TableStyled, TdStyled, TfootStyled, Text } from "./table.styled";
import { Button } from "./button";
import * as actions from "../redux/actions";

const TableMain = ({
  M,
  N,
  createNewMatrix,
  matrix,
  incrementItem,
  hoverItem,
  deleteRow,
  averageValueColumn,
  averageValueColumnThank,
}) => {
  useEffect(() => {
    createNewMatrix(M, N);
  }, [M, N, createNewMatrix]);
  useEffect(() => {
    averageValueColumnThank(matrix);
  }, [averageValueColumnThank, matrix]);

  return (
    <>
      {!!matrix.length || <Text>Game over</Text>}
      <TableStyled>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <TdStyled
                  key={j}
                  onClick={() => incrementItem(i, j)}
                  onMouseEnter={(event) => hoverItem(col.amount, event)}
                  onMouseLeave={(event) => hoverItem(col.amount, event)}
                  backgroundImage={col.percent}
                  size={col.size}
                  hover
                >
                  {col.percent ? col.percent + "%" : col.amount}
                </TdStyled>
              ))}
              <td>
                <Button onClick={() => deleteRow(i)} backgroundColor="red">
                  &#215;
                </Button>
              </td>
            </tr>
          ))}
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

const mapStateToProps = (state) => ({
  M: state.row,
  N: state.column,
  matrix: state.matrix,
  averageValueColumn: state.averageValueColumn,
});

export default connect(mapStateToProps, actions)(TableMain);
