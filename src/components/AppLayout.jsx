import React from 'react';
import AppNavigation from '../containers/AppNavigationContainer.js';

export function AppLayout({ children }) {
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
