import * as types from './types';
import {
  createMatrixRow,
  createMatrix,
  hoverSumUtils,
  getClosest,
} from '../utils/utils';

//add
export const addRow = payload => ({ type: types.ADD_ROW, payload });
export const addNewRow = row => dispatch => {
  const newRow = createMatrixRow(row);
  dispatch(addRow(newRow));
};

//delete
export const deleteRow = i => ({ type: types.DELETE_ROW, i });

//increment
export const incrementItem = (i, j) => ({
  type: types.INCREMENT_ITEM,
  i,
  j,
});

//hoverItem
export const hoverItem = payload => ({
  type: types.HOVER_ITEM,
  payload,
});
export const hoverItemThank = (
  number,
  event,
  matrix,
  step,
  copyMatri,
) => dispatch => {
  const [closest, copyMatrix] = getClosest(
    number,
    event,
    matrix,
    step,
    copyMatri,
  );
  dispatch(hoverItem({ closest, copyMatrix }));
};

//hoverSum
export const hoverSum = payload => ({
  type: types.HOVER_SUM,
  payload,
});
export const hoverSumThank = (
  i,
  event,
  matrix,
  copyMatri,
  rowSum,
) => dispatch => {
  const [newRow, copyMatrix] = hoverSumUtils(
    i,
    event,
    matrix,
    copyMatri,
    rowSum,
  );
  dispatch(hoverSum({ newRow, copyMatrix }));
};

//setMatrix
export const setMatrix = payload => ({
  type: types.SET_MATRIX,
  payload,
});

export const createNewMatrix = (row, column) => dispatch => {
  const newMatrix = createMatrix(row, column);
  dispatch(setMatrix(newMatrix));
};

//sumRow
export const sumRow = payload => ({ type: types.SET_ROW_SUM, payload });
export const sumRowThank = payload => dispatch => {
  const sum = payload.map(item =>
    Math.round(item.reduce((sum, current) => sum + current.amount, 0)),
  );
  dispatch(sumRow(sum));
};

//averageValueColumn
export const averageValue = payload => ({
  type: types.SET_AVERAGE_VALUE_COLUMN,
  payload,
});
export const averageValueColumnThank = arr => dispatch => {
  const average = arr
    .reduce((acc, item) => item.map((el, i) => el.amount + (acc[i] || 0)), [])
    .map(item => Math.trunc(item / arr.length));
  dispatch(averageValue(average));
};
