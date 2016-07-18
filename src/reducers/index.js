import authReducer from './authReducer';
import dataLoadingReducer from './dataLoadingReducer';
import dialogReducer from './dialogReducer';
import editingFieldReducer from './editingFieldReducer';
import newRoastReducer from './newRoastReducer';
import roastInProgressReducer from './roastInProgressReducer';
import roastsReducer from './roastsReducer';
import tasksReducer from './tasksReducer';
import tagsReducer from './tagsReducer';
import settingsReducer from './settingsReducer';
import stopWatchReducer from './stopWatchReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  dataLoading: dataLoadingReducer,
  dialog: dialogReducer,
  editingFields: editingFieldReducer,
  newRoast: newRoastReducer,
  roastInProgress: roastInProgressReducer,
  roasts: roastsReducer,
  tasks: tasksReducer,
  tags: tagsReducer,
  settings: settingsReducer,
  stopWatch: stopWatchReducer,
});
