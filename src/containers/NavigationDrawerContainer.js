import { connect } from 'react-redux';
import NavigationDrawer from '../components/NavigationDrawer.jsx';
import C from '../constants';
import { logout } from '../actions';

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: e => {
      e.preventDefault();
      C.FIREBASE.auth().signOut().then(() => {
        dispatch(logout());
        location.reload();
      });
    },
  };
}

const NavigationDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationDrawer);

export default NavigationDrawerContainer;
