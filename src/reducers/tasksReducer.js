import C from '../constants';
import history from '../history';

const initialState = [];

const tasksReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.FETCHED_TASKS:
      return action.tasks;

    case C.COMPARE_TASKS:
      return {
        ...currentState,
        [action.roastId]: {
          ...currentState[action.roastId],
          compare: action.compareId
        }
      };

    default:
      return currentState;
  }
};

export default tasksReducer;
