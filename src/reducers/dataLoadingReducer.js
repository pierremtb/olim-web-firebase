import C from '../constants';

const initialState = false;

const dataLoadingReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case C.LOADING_DATA:
      return true;
    case C.LOADED_DATA:
    default:
      return false;
  }
};

export default dataLoadingReducer;
