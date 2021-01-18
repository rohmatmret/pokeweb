import * as actions from './actions.js';

export const initialState = [];

export default function reducer(state = initialState, { type, payload }) {
  
  switch (type) {
    case actions.ADD:
      return [
        ...state,
        {
          name: payload.name,
          id: payload.id
        }
      ];
    case actions.REMOVE:
      return state.filter(todo => todo.id !== payload.id);
    default:
      return state;
  }
}
