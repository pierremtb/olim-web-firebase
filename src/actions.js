import C from './constants';
import history from './history';

/**
 * Auth functions
 */

export function listeningToAuth() {
  return {
    type: C.LISTENING_TO_AUTH,
  };
}

export function loginRequest(method = 'google', nextPath = '/') {
  return {
    type: C.LOGIN_REQUEST,
    method,
    nextPath,
  };
}

export function loginSuccess(user, nextPath = '/') {
  history.push(nextPath);
  return {
    type: C.LOGIN_SUCCESS,
    user,
    nextPath,
  };
}

export function logout(nextPath = '/') {
  history.push(nextPath);
  history.reload();
  return {
    type: C.LOGOUT,
    nextPath,
  };
}

export function startListeningToAuth() {
  return function (dispatch) {
    dispatch(listeningToAuth());
    // Start listening to firebase auth changes.
    C.FIREBASE.auth().onAuthStateChanged(authData => {
      // If logged in.
      if (authData) {
        dispatch(loginSuccess(authData));
      } else {
        dispatch(logout());
      }
    });
  };
}

/**
 * Tasks
 */

export function startListeningToTasks() {
  if (C.FIREBASE.auth().currentUser) {
    const uid = C.FIREBASE.auth().currentUser.uid;
    return (dispatch, getState) => {
      const tasksRef = C.FIREBASE.app().database().ref('users').child(uid).child('tasks');
      tasksRef.on('value', snapshot => {
        dispatch(fetchedTasks(snapshot.val()));
      }, err => {
        console.log(err);
      });
    };
  }
  return (dispatch, getState) => {
    dispatch(logout());
  };
}

export function fetchedTags(snapshot) {
  const tags = [];
  snapshot.forEach(child => {
    const tag = child.val();
    tags.push({
      key: child.key,
      ...child.val(),
    });
  });
  return {
    type: C.FETCHED_TAGS,
    tags,
  };
}

export function fetchedTasks(snapshot) {
  const tasks = [];
  snapshot.forEach(child => {
    tasks.push({
      key: child.key,
      ...child.val(),
    });
  });
  return {
    type: C.FETCHED_TASKS,
    tasks,
  };
}

/**
 * Data loading
 */

export function loadingData(){
  return { type: C.LOADING_DATA };
}

export function loadedData(){
  return { type: C.LOADED_DATA };
}

// Drawer position.
export function wantDrawerDocked(){
  return { type: C.DOCK_DRAWER };
}

export function wantDrawerUndocked() {
  return { type: C.UNDOCK_DRAWER };
}

export function shouldDrawerBeDocked(){
  return { type: C.SHOULD_DOCK_DRAWER };
}

export function shouldDrawerBeUndocked() {
  return { type: C.SHOULD_UNDOCK_DRAWER };
}

export function openDrawer() {
  return { type: C.OPEN_DRAWER };
}

export function closeDrawer() {
  return { type: C.CLOSE_DRAWER };
}

/**
 * Settings
 */

export function updateSetting(setting, value) {
  return {
    type: C.UPDATE_SETTING,
    setting,
    value
  };
}

export function fetchedSettings(settings) {
  return {
    type: C.FETCHED_SETTINGS,
    settings
  };
}
