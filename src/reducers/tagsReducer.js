import C from '../constants';
import history from '../history';

const initialState = [];

const tagsReducer = (currentState = initialState, action) => {
  switch (action.type) {

    case C.FETCHED_TAGS:
      console.log(action.tags);
      return action.tags;

    default:
      return currentState;
  }
};

export default tagsReducer;
