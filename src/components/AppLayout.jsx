import React from 'react';
import NavigationBar from '../containers/NavigationBarContainer.js';
import { cyan500 } from 'material-ui/styles/colors';
import NavigationDrawer from '../containers/NavigationDrawerContainer';

export function AppLayout(props) {
  document.body.style.backgroundColor = cyan500;
  return (
    <div>
      <NavigationDrawer />
      <div style={{ paddingLeft: 280 }}>
        <NavigationBar
          route={props.children.props.route}
          routes={props.children.props.routes}
          routeParams={props.children.props.routeParams}
        />
        <div className="main-page">
          {props.children}
        </div>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: React.PropTypes.element,
  onLogout: React.PropTypes.func,
};
