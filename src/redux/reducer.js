import {
  ADD_ROW,
  DELETE_ROW,
  INCREMENT_ITEM,
  HOVER_ITEM,
  HOVER_SUM,
  GET_MATRIX,
} from "./types";

const initialState = {
  matrix: [],
  arr: [],
  row: 4,
  column: 4,
  step: 4,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATRIX:
      return { ...state, matrix: action.payload };

    case ADD_ROW:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
      ];

    case DELETE_ROW:
      return state.filter((todo) => todo.id !== action.id);

    case INCREMENT_ITEM:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case HOVER_ITEM:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case HOVER_SUM:
      const areAllMarked = state.every((todo) => todo.completed);
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }));

    default:
      return state;
  }
};
