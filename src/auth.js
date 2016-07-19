import { browserHistory } from 'react-router';
import C from './constants';
import firebase from 'firebase';

const auth = {
  login: (provider) => {
    let authProvider = null;

    switch (provider) {
      case 'facebook':
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;

      case 'google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;

      default:
        break;
    }

    if (window.location.protocol === 'http') {
      return C.FIREBASE.auth().signInWithPopup(authProvider);
    }
    return C.FIREBASE.auth().signInWithRedirect(authProvider);
  },

  isLoggedIn: () => C.FIREBASE.auth().currentUser,

  checkAuth: (nextState, replace) => {
    if (!C.FIREBASE.auth().currentUser) {
      replace({
        pathname: '/action/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  },

  authUiConfig: {
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: "tos-url-goes-here",
    siteName: "Olim",
    callbacks: {
      signInSuccess: function (currentUser, credential, redirectUrl) {
        return false; // Do not redirect automatically
      }
    }
  },
};

export default auth;
