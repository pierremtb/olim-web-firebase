import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import auth from './auth';
import history from './history';
import AppLayout from './containers/AppLayoutContainer';
import PublicLayout from './components/PublicLayout.jsx';
import PageTasks from './components/PageTasks.jsx';
import PageTags from './components/PageTags.jsx';
import PageSearch from './components/PageSearch.jsx';
import PageSettings from './components/PageSettings.jsx';
import PageLogin from './components/PageLogin.jsx';
import NotFound from './components/PageNotFound.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { globalTheme } from './themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactGA from 'react-ga';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import C from './constants';
import rootReducer from './reducers/index';
import {
  fetchedTasks,
  fetchedTags,
  listeningToAuth,
  loadedData,
  loadingData,
  loginSuccess,
  logout,
} from './actions';

require('./scss/grid.scss');
require('./scss/application.scss');

injectTapEventPlugin();

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer, {},
  window.devToolsExtension && window.devToolsExtension()
);

ReactGA.initialize(C.GOOGLE_ANALYTICS_CODE);

const routes = (
  <Router history={history}>
    <Route path="/action" component={PublicLayout}>
      <Route path="login" component={PageLogin} />
    </Route>

    <Route path="/" component={AppLayout}>
      <IndexRoute name="Tasks" component={PageTasks} onEnter={auth.checkAuth} />
      <Route name="Tasks" path="/tasks" component={PageTasks} onEnter={auth.checkAuth} />
      <Route name="Tasks" path="/tasks/:group" component={PageTasks} onEnter={auth.checkAuth} />
      <Route name="Tasks" path="/tasks/tag/:tagName" component={PageTasks} onEnter={auth.checkAuth} />
      <Route name="Search" path="/search" component={PageSearch} onEnter={auth.checkAuth} />
      <Route name="Search" path="/search/:query" component={PageSearch} onEnter={auth.checkAuth} />
      <Route name="Tags" path="/tags" component={PageTags} onEnter={auth.checkAuth} />
      <Route name="Settings" path="/settings" component={PageSettings} onEnter={auth.checkAuth} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={globalTheme}>
      {routes}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-root')
);

store.dispatch(listeningToAuth());

C.FIREBASE.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    store.dispatch(loginSuccess(user));
    store.dispatch(loadingData());

    const tasksRef = C.FIREBASE.app().database().ref(`/users/${user.uid}/tasks`);
    tasksRef.on('value', snapshot => {
      store.dispatch(fetchedTasks(snapshot));
      store.dispatch(loadedData());
    }, err => {
      console.log(err);
    });

    const tagsRef = C.FIREBASE.app().database().ref(`/users/${user.uid}/tags`);
    tagsRef.on('value', snapshot => {
      store.dispatch(fetchedTags(snapshot));
      store.dispatch(loadedData());
    }, err => {
      console.log(err);
    });
  } else {
    C.FIREBASE.auth().getRedirectResult().then(result => {
      if (!result.user) {
        store.dispatch(logout());
      } else {
        store.dispatch(loginSuccess(result.user));
      }
    });
  }
}, err => {
  console.log(err);
});
