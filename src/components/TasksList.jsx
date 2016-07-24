import React from 'react';
import TasksGroup from './TasksGroup.jsx';
import moment from 'moment';
import TaskAdder from './TaskAdder.jsx';
import Loading from './Loading.jsx';
import Snackbar from 'material-ui/Snackbar';

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackMessage: '',
      snackOpened: false,
      deletedTask: null,
    };
    this.getSelectedGroup = this.getSelectedGroup.bind(this);
    this.handleSnackUndo = this.handleSnackUndo.bind(this);
    this.openSnack = this.openSnack.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.removeTaskUndoable = this.removeTaskUndoable.bind(this);
  }

  getSelectedGroup() {
    if (this.props.routeParams) {
      if (this.props.routeParams.group) {
        return this.props.routeParams.group;
      }
    }
    return 'all';
  }

  removeTaskUndoable(task) {
    this.props.removeTask(task);
    this.openSnack(task);
  }

  handleSnackUndo() {
    if (this.state.deletedTask) {
      this.props.insertTask(this.state.deletedTask);
      this.setState({ deletedTask: null });
      this.closeSnack();
    }
  }

  openSnack(task) {
    this.setState({
      snackOpened: true,
      snackMessage: `Task '${task.title}' has been removed.`,
      deletedTask: task,
    });
  }

  closeSnack() {
    this.setState({ snackOpened: false });
  }

  render() {
    let tasks = this.props.tasks;
    const { insertTask, updateTask,
      tags, routeParams, route, dataLoading, drawerDocked } = this.props;
    const noEmptyMessage = this.getSelectedGroup() === 'all' || this.getSelectedGroup() === 'upcoming';
    if (routeParams.query) {
      tasks = tasks.filter(task =>
      task.title.toUpperCase().indexOf(routeParams.query.toUpperCase()) !== -1);
    }
    if (route.name === 'Search') {
      return (
        <div style={{ marginTop: -75 }}>
          <TasksGroup
            tasks={tasks}
            groupName={''}
            availableTags={tags}
            onTaskUpdate={updateTask}
            onTaskRemove={this.removeTaskUndoable}
            noEmptyMessage={noEmptyMessage}
          />
        </div>
      );
    }
    if (routeParams.tagName) {
      tasks = tasks.filter(task => {
        const tag = tags.filter(t => t.key === task.tagKey)[0];
        return tag ? tag.name.toLowerCase() === routeParams.tagName : false;
      });
    }
    const overdueTasks = tasks.filter(task =>
      moment(task.dueDate, 'x').startOf('day').isBefore(moment().startOf('day')) && !task.done
    );
    const todayTasks = tasks.filter(task =>
      moment(task.dueDate, 'x').startOf('day').isSame(moment().startOf('day'))
    );
    const tomorrowTasks = tasks.filter(task =>
      moment(task.dueDate, 'x').startOf('day').isSame(moment().add(1, 'days').startOf('day'))
    );
    const nextSevenDaysTasks = tasks.filter(task => {
      const taskDay = moment(task.dueDate, 'x').startOf('day');
      const tomorrow = moment().add('days', 1).startOf('day');
      const theDayInSevenDays = moment().add(8, 'days').startOf('day');
      return taskDay.isAfter(tomorrow) && taskDay.isBefore(theDayInSevenDays);
    });
    const laterTasks = tasks.filter(task =>
      moment(task.dueDate, 'x').startOf('day').isAfter(moment().add(8, 'days').startOf('day'))
    );

    return dataLoading ? <Loading /> : (
      <div>
        {this.getSelectedGroup() === 'overdue' || this.getSelectedGroup() === 'all' ?
          <TasksGroup
            tasks={overdueTasks}
            groupName={'Overdue'}
            availableTags={tags}
            onTaskInsert={insertTask}
            onTaskUpdate={updateTask}
            onTaskRemove={this.removeTaskUndoable}
            noEmptyMessage={noEmptyMessage}
          /> : null}
        {this.getSelectedGroup() === 'today' || this.getSelectedGroup() === 'all'
         || this.getSelectedGroup() === 'upcoming' ?
          <TasksGroup
            tasks={todayTasks}
            groupName={'Today'}
            availableTags={tags}
            onTaskInsert={insertTask}
            onTaskUpdate={updateTask}
            onTaskRemove={this.removeTaskUndoable}
            noEmptyMessage={noEmptyMessage}
          /> : null}
        {this.getSelectedGroup() === 'tomorrow' || this.getSelectedGroup() === 'all'
         || this.getSelectedGroup() === 'upcoming' ?
          <TasksGroup
            tasks={tomorrowTasks}
            groupName={'Tomorrow'}
            availableTags={tags}
            onTaskInsert={insertTask}
            onTaskUpdate={updateTask}
            onTaskRemove={this.removeTaskUndoable}
            noEmptyMessage={noEmptyMessage}
          /> : null}
        {this.getSelectedGroup() === 'next-7-days' || this.getSelectedGroup() === 'all'
         || this.getSelectedGroup() === 'upcoming' ?
          <TasksGroup
            tasks={nextSevenDaysTasks}
            groupName={'In the next seven days'}
            availableTags={tags}
            onTaskInsert={insertTask}
            onTaskUpdate={updateTask}
            onTaskRemove={this.removeTaskUndoable}
            noEmptyMessage={noEmptyMessage}
          /> : null}
        {this.getSelectedGroup() === 'later' || this.getSelectedGroup() === 'all'
         || this.getSelectedGroup() === 'upcoming' ?
          <TasksGroup
            tasks={laterTasks}
            groupName={'Later'}
            availableTags={tags}
            onTaskInsert={insertTask}
            onTaskUpdate={updateTask}
            onTaskRemove={this.removeTaskUndoable}
            noEmptyMessage={noEmptyMessage}
          /> : null}
        <TaskAdder
          tasks={tasks}
          tags={tags}
          onTaskInsert={insertTask}
          drawerDocked={drawerDocked}
          onTaskUpdate={updateTask}
        />
        <Snackbar
          open={this.state.snackOpened}
          message={this.state.snackMessage}
          action="undo"
          autoHideDuration={4000}
          onActionTouchTap={this.handleSnackUndo}
          onRequestClose={this.closeSnack}
          style={{
            top: 0,
            marginLeft: 280,
            bottom: 'auto',
            transform: this.state.snackOpened ?
                'translate3d(0, 0, 0)' :
                'translate3d(0, -50px, 0)'
          }}
        />
      </div>
    );
  }
}

TasksList.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
  routeParams: React.PropTypes.object,
  insertTask: React.PropTypes.func,
  updateTask: React.PropTypes.func,
  removeTask: React.PropTypes.func,
  dataLoading: React.PropTypes.bool,
  drawerDocked: React.PropTypes.bool,
};
