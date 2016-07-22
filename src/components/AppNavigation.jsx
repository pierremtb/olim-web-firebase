import React from 'react';
import { AuthenticatedNavigation } from './AuthenticatedNavigation.jsx';

export default function AppNavigation(props) {
  function renderNavigation() {
    return (
      <AuthenticatedNavigation
        tags={props.tags}
        route={props.route}
        routes={props.routes}
        routeParams={props.routeParams}
        userName={props.userName}
        onLogout={props.logout}
      />
    );
  }
  return <div> {renderNavigation()}</div>;
}

AppNavigation.propTypes = {
  userName: React.PropTypes.string,
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
  routeParams: React.PropTypes.object,
  logout: React.PropTypes.func,
};
