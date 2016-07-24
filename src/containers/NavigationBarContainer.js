import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar.jsx';
import {
  wantDrawerDocked,
  wantDrawerUndocked,
  openDrawer,
  closeDrawer,
} from '../actions';

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    tags: state.tags,
    userName: state.auth.userName,
    drawer: state.drawer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dockDrawer() {
      dispatch(wantDrawerDocked());
      dispatch(openDrawer());
    },
    undockDrawer() {
      dispatch(wantDrawerUndocked());
      dispatch(closeDrawer());
    },
    openDrawer() {
      dispatch(openDrawer());
    },
    closeDrawer() {
      dispatch(closeDrawer());
    },
  };
}

const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

export default NavigationBarContainer;
