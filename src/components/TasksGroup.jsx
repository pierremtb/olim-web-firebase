import React from 'react';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import SubHeader from 'material-ui/Subheader';
import Task from './Task.jsx';
import EmptyMessage from './EmptyMessage.jsx';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { secondaryTextStyle } from '../themes.js';
import moment from 'moment';
import { setTime, setDay } from '../utils.js';

export default class TasksGroup extends React.Component {
  constructor(props) {
    super(props);
    this.markAllAsDone = this.markAllAsDone.bind(this);
    this.postponeAllTo = this.postponeAllTo.bind(this);
  }

  markAllAsDone() {
    this.props.tasks.map(t => {
      const task = {};
      Object.assign(task, t);
      task.dueDate = new Date(task.dueDate);
      task.done = true;
      task.taskKey = task.key;
      this.props.onTaskUpdate(task);
      return t;
    });
  }

  postponeAllTo(newDate, setDate) {
    this.props.tasks.map(t => {
      const task = {};
      Object.assign(task, t);
      task.dueDate = setDate(task.dueDate, newDate(task.dueDate));
      task.taskKey = task.key;
      this.props.onTaskUpdate(task);
      return t;
    });
  }

  render() {
    const { tasks, noEmptyMessage, groupName, availableTags,
      onTaskInsert, onTaskUpdate, onTaskRemove } = this.props;
    if ((tasks.length === 0 || !tasks) && !noEmptyMessage) {
      return (
        <EmptyMessage
          iconName="weekend"
          message="Nothing to do"
        />
      );
    } else if ((tasks.length === 0 || !tasks) && noEmptyMessage) {
      return null;
    }

    return (
      <div style={{ paddingTop: 20 }}>
        <Toolbar style={{ background: 'transparent' }}>
          <ToolbarGroup firstChild>
            <SubHeader>{groupName}</SubHeader>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconMenu
              iconButtonElement={
                <IconButton
                  iconClassName="material-icons"
                  iconStyle={secondaryTextStyle}
                  tooltip="Postpone all"
                >
                  timelapse
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <MenuItem
                primaryText="Postpone all to the next hour"
                onTouchTap={() =>
                this.postponeAllTo((date) => moment(date).add(1, 'h').toDate(), setTime)
              }
              />
              <MenuItem
                primaryText="Postpone all all to the next day"
                onTouchTap={() =>
                this.postponeAllTo((date) => moment(date).add(1, 'd').toDate(), setDay)
              }
              />
              <Divider />
              <MenuItem
                primaryText="Postpone all to a specific day"
                onTouchTap={() => this.refs.newDayPicker.show()}
              />
              <MenuItem
                primaryText="Postpone all to a specific time"
                onTouchTap={() => this.refs.newTimePicker.show()}
              />
            </IconMenu>
            <IconButton
              iconClassName="material-icons"
              iconStyle={secondaryTextStyle}
              tooltip="Mark all as done"
              onTouchTap={this.markAllAsDone}
            >
              done_all
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          <List>
            {tasks.map(task =>
              <Task
                title={task.title}
                dueDate={new Date(task.dueDate)}
                tag={availableTags.filter(tag => tag.key === task.tagKey)[0]}
                availableTags={availableTags}
                done={task.done}
                taskKey={task.key}
                reminder={task.reminder}
                onTaskInsert={onTaskInsert}
                onTaskUpdate={onTaskUpdate}
                onTaskRemove={onTaskRemove}
              />
            )}
          </List>
        </Paper>
        <DatePickerDialog
          autoOk
          open={false}
          initialDate={moment().toDate()}
          container="dialog"
          ref="newDayPicker"
          onAccept={date => this.postponeAllTo(() => date, setDay)}
        />
        <TimePickerDialog
          autoOk
          open={false}
          initialTime={moment().toDate()}
          container="dialog"
          format="ampm"
          ref="newTimePicker"
          onAccept={date => this.postponeAllTo(() => date, setTime)}
        />
      </div>
    );
  }
}

TasksGroup.propTypes = {
  tasks: React.PropTypes.array,
  groupName: React.PropTypes.string,
  availableTags: React.PropTypes.array,
  onTaskInsert: React.PropTypes.func,
  onTaskUpdate: React.PropTypes.func,
  onTaskRemove: React.PropTypes.func,
  noEmptyMessage: React.PropTypes.bool,
};
