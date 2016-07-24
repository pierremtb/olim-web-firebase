import { connect } from 'react-redux';
import NavigationDrawer from '../components/NavigationDrawer.jsx';
import C from '../constants';
import { logout, closeDrawer, wantDrawerUndocked } from '../actions';

function mapStateToProps(state) {
  return {
    user: state.auth,
    docked: state.drawer.wantItDocked && state.drawer.shouldBeDocked,
    opened: state.drawer.opened,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout(e) {
      e.preventDefault();
      C.FIREBASE.auth().signOut().then(() => {
        dispatch(logout());
        location.reload();
      });
    },
    undockDrawer() {
      dispatch(wantDrawerUndocked());
      dispatch(closeDrawer());
    },
    closeDrawer() {
      dispatch(closeDrawer());
    },
  };
}

const NavigationDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationDrawer);

export default NavigationDrawerContainer;
