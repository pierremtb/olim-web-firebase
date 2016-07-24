import { connect } from 'react-redux';
import AppLayout from '../components/AppLayout.jsx';
import { shouldDrawerBeDocked, shouldDrawerBeUndocked, openDrawer, closeDrawer } from '../actions';

function mapStateToProps(state) {
  return {
    docked: state.drawer.shouldBeDocked && state.drawer.wantItDocked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shouldDockDrawer() {
      dispatch(shouldDrawerBeDocked());
      dispatch(openDrawer());
    },
    shouldUndockDrawer() {
      dispatch(shouldDrawerBeUndocked());
      dispatch(closeDrawer());
    },
  };
}

const AppLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);

export default AppLayoutContainer;
