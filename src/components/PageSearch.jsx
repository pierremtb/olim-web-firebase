import React from 'react';
import TasksList from '../containers/TasksListContainer.js';
import TagsList from '../containers/TagsListContainer.js';
import SubHeader from 'material-ui/Subheader';

export function PageSearch(props) {
  return (
    <div className="container">
      <br />
      <br />
      <SubHeader>Tasks</SubHeader>
      <TasksList routeParams={props.routeParams} route={props.route} />
      <br />
      <br />
      <SubHeader>Tags</SubHeader>
      <TagsList routeParams={props.routeParams} route={props.route} />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

PageSearch.propTypes = {
  routeParams: React.PropTypes.object,
  route: React.PropTypes.object,
};
