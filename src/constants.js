import firebase from 'firebase';

const firebaseConf = {
  apiKey: 'AIzaSyAAHj50vK1Ro1Cy0LsE0O5alo3AXaJ0jtU',
  authDomain: 'olim-1342.firebaseapp.com',
  databaseURL: 'https://olim-1342.firebaseio.com',
  storageBucket: 'olim-1342.appspot.com',
};
firebase.initializeApp(firebaseConf);

const C = {
  // Auth actions.
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  LISTENING_TO_AUTH: 'LISTENING_TO_AUTH',

  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',

  // Tasks actions
  FETCHING_TASKS: 'FETCHING_TASKS',
  FETCHED_TASKS: 'FETCHED_TASKS',
  COMPARE_TASKS: 'COMPARE_TASKS',

  // Tags actions
  FETCHING_TAGS: 'FETCHING_TAGS',
  FETCHED_TAGS: 'FETCHED_TAGS',
  COMPARE_TAGS: 'COMPARE_TAGS',

  // Auth states.
  LOGGED_IN: 'LOGGED_IN',
  LOGGING_IN: 'LOGGING_IN',
  LOGGED_OUT: 'LOGGED_OUT',

  // Drawer actions.
  DOCK_DRAWER: 'DOCK_DRAWER',
  UNDOCK_DRAWER: 'UNDOCK_DRAWER',
  OPEN_DRAWER: 'OPEN_DRAWER',
  CLOSE_DRAWER: 'CLOSE_DRAWER',
  SHOULD_DOCK_DRAWER: 'SHOULD_DOCK_DRAWER',
  SHOULD_UNDOCK_DRAWER: 'SHOULD_UNDOCK_DRAWER',

  // MISC.
  FIREBASE: firebase,
  CHART_COLORS: ['#B71C1C', '#F9A825', '#AD1457', '#00796B', '#26C6DA', '#388E3C'],

  // Data loading.
  LOADING_DATA: 'LOADING_DATA',
  LOADED_DATA: 'LOADED_DATA',

  // Google analytics
  GOOGLE_ANALYTICS_CODE: 'UA-79419231-1',

  // Settings actions.
  UPDATE_SETTING: 'UPDATE_SETTING',
  FETCHED_SETTINGS: 'FETCHED_SETTINGS',
};

export default C;
