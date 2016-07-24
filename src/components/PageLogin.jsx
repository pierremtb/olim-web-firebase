import React from 'react';
import auth from '../auth.js';
import C from '../constants';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  primaryColor,
  accentColor,
  primaryDarkColor,
  loginCardStyle,
  loginTextFieldStyle,
} from '../themes.js';
import { blueGrey800, cyan500 } from 'material-ui/styles/colors';

export function PageLogin(props) {
  const FirebaseAuthUi = new firebaseui.auth.AuthUI(C.FIREBASE.auth());
  FirebaseAuthUi.start("#firebaseui-auth-container", auth.authUiConfig);

  return (
    <div className="center-align login-container" style={{ marginTop: 100 }}>
      <h1
        style={{
          color: cyan500,
          letterSpacing: 10,
          textTransform: 'uppercase',
          marginRight: -10,
          fontWeight: 100,
          fontSize: 40,
        }}
      >
        olim
      </h1>
      <div className="loginForm">
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  );
}
