import { connect } from 'react-redux';
import AppNavigation from '../components/AppNavigation.jsx';
import C from '../constants';
import { logout } from '../actions';

function mapStateToProps(state) {
  const unitSystem = state.settings.unitSystem;
  return {
    tasks: state.tasks,
    tags: state.tags,
    userName: state.auth.userName,
    unitSystem,
    tempUnit: unitSystem === C.IMPERIAL ? '°F' : '°C',
    weightUnit: unitSystem === C.IMPERIAL ? 'lbs' : 'kg',
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
    }
  };
}

const AppNavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavigation);

export default AppNavigationContainer;
