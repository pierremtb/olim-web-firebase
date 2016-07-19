import React from 'react';
import AppNavigation from '../containers/AppNavigationContainer.js';
import { cyan500 } from 'material-ui/styles/colors';

export function AppLayout({ children }) {

  document.body.style.backgroundColor = cyan500;

  return (
    <div>
      <AppNavigation
        route={children.props.route}
        routes={children.props.routes}
        routeParams={children.props.routeParams}
      />
      <div className="main-page">
        {children}
      </div>
    </div>
  );
}
AppLayout.propTypes = {
  children: React.PropTypes.element,
};
