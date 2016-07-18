import React from 'react';
import { AuthenticatedNavigation } from './AuthenticatedNavigation.jsx';

export function AppNavigation(props) {
  function renderNavigation(isUser) {
    return isUser ?
      <AuthenticatedNavigation
        tags={props.tags}
        route={props.route}
        routes={props.routes}
        routeParams={props.routeParams}
      />
    : null;
  }
  return <div> {renderNavigation(props.isUser)}</div>;
}

AppNavigation.propTypes = {
  isUser: React.PropTypes.object,
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
  routeParams: React.PropTypes.object,
};
