export const ADD = 'ADD';
export const REMOVE = 'REMOVE';

export function add(todo) {
  return {
    type: ADD,
    payload: {
      todo
    }
  };
}

export function remove(id) {
  return {
    type: REMOVE,
    payload: {
      id
    }
  };
}
