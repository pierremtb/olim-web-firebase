import C from '../constants';

const initialState = [];

const tasksReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case C.FETCHED_TASKS:
      return action.tasks;
    default:
      return currentState;
  }
};

export default tasksReducer;
