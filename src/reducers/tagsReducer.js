import C from '../constants';

const initialState = [];

const tagsReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case C.FETCHED_TAGS:
      return action.tags;
    default:
      return currentState;
  }
};

export default tagsReducer;
