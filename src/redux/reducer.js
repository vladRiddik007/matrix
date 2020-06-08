import * as types from "./types";
import { hoverSum, getClosest } from "../utils/utils";

const initialState = {
  matrix: [],
  copyMatrix: [],
  rowSum: [],
  averageValueColumn: [],
  row: 5,
  column: 5,
  step: 4,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MATRIX:
      return {
        ...state,
        matrix: action.payload,
      };

    case types.SET_ROW_SUM:
      return { ...state, rowSum: action.payload };

    case types.SET_AVERAGE_VALUE_COLUMN:
      return { ...state, averageValueColumn: action.payload };

    case types.SET_COPY_MATRIX:
      return { ...state, copyMatrix: action.payload };

    case types.ADD_ROW:
      return {
        ...state,
        matrix: [...state.matrix, action.payload],
      };

    case types.DELETE_ROW:
      const newMatrix = [
        ...state.matrix.slice(0, action.i),
        ...state.matrix.slice(action.i + 1),
      ];

      return {
        ...state,
        matrix: newMatrix,
      };

    case types.INCREMENT_ITEM:
      const newItem = state.matrix[action.i][action.j];
      newItem.amount++;
      state.copyMatrix[action.i][action.j].amount++;
      const matrixIncrement = [
        ...state.matrix.slice(0, action.i),
        [
          ...state.matrix[action.i].slice(0, action.j),
          { ...newItem },
          ...state.matrix[action.i].slice(++action.j),
        ],
        ...state.matrix.slice(++action.i),
      ];

      return {
        ...state,
        matrix: matrixIncrement,
      };

    case types.HOVER_ITEM:
      let [closest, copyMat] = getClosest(
        action.number,
        action.event,
        state.matrix,
        state.step,
        state.copyMatrix
      );

      return { ...state, matrix: closest, copyMatrix: copyMat };

    case types.HOVER_SUM:
      const [newRow, copyMatrix] = hoverSum(
        action.i,
        action.event,
        state.matrix,
        state.copyMatrix,
        state.rowSum
      );
      return { ...state, matrix: newRow, copyMatrix };

    default:
      return state;
  }
};
