import * as types from "./types";

export const addRow = (M, N) => ({ type: types.ADD_ROW, M, N });
export const deleteRow = () => ({ type: types.DELETE_ROW });
export const incrementItem = () => ({ type: types.INCREMENT_ITEM });
export const hoverItem = () => ({ type: types.HOVER_ITEM });
export const hoverSum = () => ({ type: types.HOVER_SUM });
export const getMatrix = (payload) => ({
  type: types.GET_MATRIX,
  payload,
});
