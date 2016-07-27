import React from 'react';
import NavigationBar from '../containers/NavigationBarContainer.js';
import { cyan500 } from 'material-ui/styles/colors';
import NavigationDrawer from '../containers/NavigationDrawerContainer';
import transitions from 'material-ui/styles/transitions';
import { WindowResizeListener } from 'react-window-resize-listener';

export default function AppLayout(props) {
  document.body.style.backgroundColor = cyan500;
  const pathname = props.location.pathname;
  console.log(props);
  return (
    <div>
      <NavigationDrawer />
      <div
        style={{
          paddingLeft: props.docked ? 280 : 0,
          transition: `padding-left 450ms ${transitions.easeOutFunction}`,
        }}
      >
        <NavigationBar
          route={props.children.props.route}
          routes={props.children.props.routes}
          routeParams={props.children.props.routeParams}
        />
        <div className="main-page">
          {props.children}
        </div>
      </div>
      <WindowResizeListener
        onResize={windowSize => {
          if (windowSize.windowWidth > 1000) {
            props.shouldDockDrawer();
          } else {
            props.shouldUndockDrawer();
          }
        }}
      />
    </div>
  );
}

AppLayout.propTypes = {
  route: React.PropTypes.object,
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  onLogout: React.PropTypes.func,
  docked: React.PropTypes.bool,
  shouldDockDrawer: React.PropTypes.func,
  shouldUndockDrawer: React.PropTypes.func,
};
