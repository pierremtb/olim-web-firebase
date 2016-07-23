import authReducer from './authReducer';
import dataLoadingReducer from './dataLoadingReducer';
import tasksReducer from './tasksReducer';
import tagsReducer from './tagsReducer';
import settingsReducer from './settingsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  dataLoading: dataLoadingReducer,
  tasks: tasksReducer,
  tags: tagsReducer,
  settings: settingsReducer,
});
