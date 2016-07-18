import firebase from 'firebase';

import C from './constants';
import history from './history';

// Auth actions.
export const listeningToAuth = () => {
  return {
    type: C.LISTENING_TO_AUTH,
  };
};

export const loginRequest = (method = 'google', nextPath = '/') => {
  return {
    type: C.LOGIN_REQUEST,
    method,
    nextPath,
  };
};

export const loginSuccess = (user, nextPath = '/') => {
  history.push(nextPath);
  return {
    type: C.LOGIN_SUCCESS,
    user,
    nextPath,
  };
};

export const logout = (nextPath = '/') => {
  history.push(nextPath);
  return {
    type: C.LOGOUT,
    nextPath,
  };
};

export const startListeningToAuth = () => {
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
};

// Tasks actions.
export const startListeningToTasks = () => {
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
};

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

export const compareTasks = (taskId, compareId) => {
  return {
    type: C.COMPARE_TASKS,
    taskId,
    compareId
  };
};

// Roasts actions.
export const startListeningToRoasts = () => {
  if (C.FIREBASE.auth().currentUser) {
    const uid = C.FIREBASE.auth().currentUser.uid;
    return (dispatch, getState) => {
      let roastsRef = C.FIREBASE.app().database().ref('roasts').equalTo('uid', uid);
      roastsRef.on('value', snapshot => {
        dispatch(fetchedRoasts(snapshot.val()));
      }, err => {
        console.log(err);
      });
    };
  } else {
    return (dispatch, getState) => {
      dispatch(logout());
    };
  }
};

export const fetchedRoasts = (roasts) => {
  return {
    type: C.FETCHED_ROASTS,
    roasts
  };
};

export const compareRoasts = (roastId, compareId) => {
  return {
    type: C.COMPARE_ROASTS,
    roastId,
    compareId
  };
};

export const addFirstCrack = (roastId, firstCrackTime) => {
  return {
    type: C.ADD_FIRST_CRACK,
    roastId,
    firstCrackTime
  };
};

// New roast actions.
export const createNewRoast = (roastDetails) => {
  return {
    type: C.CREATING_NEW_ROAST,
    roastDetails: roastDetails
  };
};

export const removeRoast = roastId => {
  return {
    type: C.REMOVE_ROAST,
    roastId
  };
};

export const createNewRoastSuccess = (roastData) => {
  return {
    type: C.CREATE_NEW_ROAST_SUCCESS,
    roastData: roastData
  };
};

export const createNewRoastFailed = (error) => {
  return {
    type: C.CREATE_NEW_ROAST_FAILED,
    error,
  };
};

export const updateRoastValue = (roastId, field, value) => {
  return {
    type: C.UPDATE_ROAST_VALUE,
    roastId,
    field,
    value,
  };
};

export const updateCurrentRoastValue = (field, value) => {
  return {
    type: C.UPDATE_CURRENT_ROAST_VALUE,
    field,
    value,
  };
};

// Field actions.
export const toggleEditing = (roastId, field) => {
  return {
    type: C.TOGGLE_EDITING_FIELD,
    roastId,
    field,
  };
};

// Stopwatch actions.
export const startStopWatch = (roastId, roastStart, tick) => {
  const uid = C.FIREBASE.auth().currentUser.uid;
  let roastRef = C.FIREBASE.app().database().ref(`roasts/${uid}/${roastId}`);

  roastRef.update({
    status: C.ROAST_IN_PROGRESS,
    roastStart,
  });

  return {
    type: C.STOPWATCH_START,
    roastId,
    tick
  };
};

export const resumeStopWatch = (roastId, roastStart, tick) => {
  return {
    type: C.STOPWATCH_RESUME,
    roastId,
    tick
  };
};

export const tickStopWatch = (roastStart) => {
  return {
    type: C.STOPWATCH_TICK,
    roastStart
  };
};

export const stopStopWatch = (roastId) => {
  let uid = C.FIREBASE.auth().currentUser.uid;
  let roastRef = C.FIREBASE.app().database().ref(`roasts/${uid}/${roastId}`);

  let promise = roastRef.update({
    status: C.ROAST_COMPLETED
  });

  return {
    type: C.STOPWATCH_STOP,
    roastId,
    promise
  };
};

// Roast progress actions.
export const checkRoastInProgress = roasts => {
  return {
    type: C.CHECK_ROAST_IN_PROGRESS,
    roasts
  };
};

// Dialog actions.
export const showDialog = ({
  dialogType='info',
  noAction = null,
  noText = 'No',
  text,
  yesAction,
  yesText = 'Yes'
}) => {
  return {
    dialogType,
    noAction,
    noText,
    text,
    type: C.SHOW_DIALOG,
    yesAction,
    yesText
  };
};

export const clearDialog = () => {
  return {
    type: C.CLEAR_DIALOG
  };
};

// Data loading.
export const loadingData = () => {
  return {
    type: C.LOADING_DATA
  };
}

export const loadedData = () => {
  return {
    type: C.LOADED_DATA
  };
}

// Settings.
export const updateSetting = (setting, value) => {
  return {
    type: C.UPDATE_SETTING,
    setting,
    value
  };
}

export const fetchedSettings = settings => {
  return {
    type: C.FETCHED_SETTINGS,
    settings
  };
}
