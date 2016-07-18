import React from 'react';
import { ListItem } from 'material-ui/List';
// import { markTaskAsDone, markTaskAsNotDone, removeTask, updateTask } from '../../api/tasks/methods';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import SubHeader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import { grey600, transparent, white } from 'material-ui/styles/colors';
import { disabledTextStyle, avatarBackgroundColor } from '../themes.js';
import { setDay, setTime } from '../utils.js';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      tagsPopoverOpened: false,
      dueDate: this.props.dueDate,
    };
    this.markTaskDone = this.markTaskDone.bind(this);
    this.markTaskNotDone = this.markTaskNotDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setNewDay = this.setNewDay.bind(this);
    this.setTag = this.setTag.bind(this);
    this.setNewTime = this.setNewTime.bind(this);
    this.setNewReminder = this.setNewReminder.bind(this);
    this.getReminderTime = this.getReminderTime.bind(this);
    this.handleTagsPopoverOpen = this.handleTagsPopoverOpen.bind(this);
    this.handleTagsPopoverClose = this.handleTagsPopoverClose.bind(this);
    this.getTagBackgroundColor = this.getTagBackgroundColor.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
    this.getTagIcon = this.getTagIcon.bind(this);
    this.getTagLetter = this.getTagLetter.bind(this);
  }

  getReminderTime() {
    if (this.props.reminder) {
      const { time } = this.props.reminder;
      return moment()
        .startOf('day')
        .hours(Math.floor(time / 60))
        .minutes(time % 60)
        .toDate();
    }
    return moment()
      .startOf('day')
      .minutes(10)
      .toDate();
  }

  setNewDay(day) {
    const { taskKey, onDateChange, dueDate, onTaskUpdate } = this.props;
    if (taskKey) {
      const task = {};
      Object.assign(task, this.props);
      task.dueDate = setDay(dueDate, day);
      onTaskUpdate(task);
    } else {
      onDateChange(setDay(dueDate, day));
    }
  }

  setNewTime(time) {
    const { taskKey, onDateChange, dueDate, onTaskUpdate } = this.props;
    if (taskKey) {
      const task = {};
      Object.assign(task, this.props);
      task.dueDate = setTime(dueDate, time);
      onTaskUpdate(task);
    } else {
      onDateChange(setTime(dueDate, time));
    }
  }

  setTag(tag) {
    const task = {};
    Object.assign(task, this.props);
    task.tag = tag;
    this.props.onTaskUpdate(task);
  }

  setNewReminder(time) {
    const { taskId } = this.props;
    let reminder = {};
    if (time) {
      const newTime = moment(time);
      reminder = { time: newTime.hours() * 60 + newTime.minutes() };
    } else {
      reminder = null;
    }
    if (taskId) {
      updateTask.call(
        { _id: taskId, update: { reminder } },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } else {
      this.props.onReminderChange(reminder);
    }
  }

  markTaskDone() {
    const task = {};
    Object.assign(task, this.props);
    task.done = true;
    this.props.onTaskUpdate(task);
  }

  markTaskNotDone() {
    const task = {};
    Object.assign(task, this.props);
    task.done = false;
    this.props.onTaskUpdate(task);
  }

  deleteTask() {
    this.props.onTaskRemove(this.props.taskKey);
  }

  handleTagsPopoverOpen(event) {
    event.preventDefault();
    this.setState({
      tagsPopoverOpened: true,
      tagsPopoverAnchor: event.currentTarget,
    });
  }

  handleTagsPopoverClose() {
    this.setState({ tagsPopoverOpened: false });
  }

  getTagBackgroundColor() {
    if (this.props.done) {
      return transparent;
    }
    if (this.props.tag) {
      if (this.props.tag.color) {
        return this.props.tag.color;
      }
    }
    return avatarBackgroundColor;
  }

  getTagColor() {
    if (!this.props.done) {
      return white;
    }
    if (this.props.tag) {
      if (this.props.tag.color) {
        return this.props.tag.color;
      }
    }
    return avatarBackgroundColor;
  }

  getTagIcon() {
    if (this.props.tag) {
      if (this.props.tag.icon) {
        return <FontIcon className="material-icons">{this.props.tag.icon}</FontIcon>;
      }
      if (this.props.tag.name) {
        return null;
      }
    }
    return <FontIcon className="material-icons">label_outline</FontIcon>;
  }

  getTagLetter() {
    if (this.props.tag) {
      if (!this.props.tag.icon && this.props.tag.name) {
        return this.props.tag.name.charAt(0).toUpperCase();
      }
    }
    return null;
  }

  render() {
    return (
      <ListItem
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        leftAvatar={
          <Avatar
            backgroundColor={this.getTagBackgroundColor()}
            color={this.getTagColor()}
            onTouchTap={this.handleTagsPopoverOpen}
            icon={this.getTagIcon()}
          >
            {this.getTagLetter()}
          </Avatar>
        }
        disabled={this.props.done}
        primaryText={
          <div style={!this.props.done ? {} : disabledTextStyle}>
            {this.props.title}
          </div>
        }
        secondaryText={moment(this.props.dueDate).format('LLL')}
      >
        {!this.props.done ?
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 12,
            }}
          >
            {!this.props.editing ?
              <div>
                <IconButton
                  iconClassName="material-icons"
                  tooltip="Mark as done"
                  iconStyle={{ color: grey600 }}
                  onTouchTap={this.markTaskDone}
                >
                  done
                </IconButton>
                <div
                  style={{
                    position: 'absolute',
                    right: 48,
                    top: 0,
                  }}
                >
                  <IconMenu
                    iconButtonElement={
                      <IconButton
                        iconClassName="material-icons"
                        tooltip="Postpone"
                        iconStyle={{
                          color: grey600,
                          opacity: this.state.hovered ? 1 : 0,
                        }}
                      >
                        timelapse
                      </IconButton>
                    }
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    style={{
                      right: 0,
                      position: 'absolute',
                    }}
                  >
                    <MenuItem
                      primaryText="Postpone to the next hour"
                      onTouchTap={() =>
                        this.setNewTime(moment(this.props.dueDate).add(1, 'h').toDate())
                      }
                    />
                    <MenuItem
                      primaryText="Postpone to the next day"
                      onTouchTap={() =>
                        this.setNewDay(moment(this.props.dueDate).add(1, 'd').toDate())
                      }
                    />
                    <Divider />
                    <MenuItem
                      primaryText="Set a new day"
                      onTouchTap={() => this.refs.newDayPicker.show()}
                    />
                    <MenuItem
                      primaryText="Set a new time"
                      onTouchTap={() => this.refs.newTimePicker.show()}
                    />
                  </IconMenu>
                  <IconMenu
                    iconButtonElement={
                      <IconButton
                        iconClassName="material-icons"
                        tooltip={!this.props.reminder ? 'Edit the reminder' : 'Add a reminder'}
                        iconStyle={{
                          color: grey600,
                          opacity: this.state.hovered ? 1 : 0,
                        }}
                      >
                        {this.props.reminder ?
                          'alarm_on'
                        : 'alarm_add'}
                      </IconButton>
                    }
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    style={{
                      right: 48,
                      position: 'absolute',
                    }}
                  >
                    <MenuItem
                      primaryText="Remind me 10' before"
                      onTouchTap={() => this.setNewReminder(moment().startOf('day').minutes(10))}
                    />
                    <MenuItem
                      primaryText="Remind me 1h before"
                      onTouchTap={() => this.setNewReminder(moment().startOf('day').hours(1))}
                    />
                    <Divider />
                    <MenuItem
                      primaryText={
                        this.props.reminder ?
                          `Edit the reminder (${this.props.reminder.time}')`
                        :
                          'Set a new reminder'
                      }
                      onTouchTap={() => this.refs.newReminderPicker.show()}
                    />
                    {this.props.reminder ?
                      <MenuItem
                        primaryText="Delete the reminder"
                        onTouchTap={() => this.setNewReminder()}
                      />
                    : null}
                  </IconMenu>
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Delete"
                    iconStyle={{
                      color: grey600,
                      opacity: this.state.hovered ? 1 : 0,
                    }}
                    style={{
                      right: 96,
                      position: 'absolute',
                    }}
                    onTouchTap={this.deleteTask}
                  >
                    delete
                  </IconButton>
                </div>
              </div>
            :
              <div>
                <IconButton
                  iconClassName="material-icons"
                  tooltip="Set the day"
                  iconStyle={{ color: grey600 }}
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}
                  onTouchTap={() => this.refs.newDayPicker.show()}
                >
                  event
                </IconButton>
                <IconButton
                  iconClassName="material-icons"
                  tooltip="Set the time"
                  iconStyle={{ color: grey600 }}
                  style={{
                    right: 48,
                    position: 'absolute',
                  }}
                  onTouchTap={() => this.refs.newTimePicker.show()}
                >
                  schedule
                </IconButton>
                <IconMenu
                  iconButtonElement={
                    <IconButton
                      iconClassName="material-icons"
                      tooltip={this.props.reminder ? 'Edit the reminder' : 'Set a reminder'}
                      iconStyle={{ color: grey600 }}
                    >
                      {this.props.reminder ? 'alarm_on' : 'alarm_add'}
                    </IconButton>
                  }
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  style={{
                    right: 96,
                    position: 'absolute',
                  }}
                >
                  <MenuItem
                    primaryText="Remind me 10' before"
                    onTouchTap={() => this.setNewReminder(moment().startOf('day').minutes(10))}
                  />
                  <MenuItem
                    primaryText="Remind me 1h before"
                    onTouchTap={() => this.setNewReminder(moment().startOf('day').hours(1))}
                  />
                  <Divider />
                  <MenuItem
                    primaryText={
                        this.props.reminder ?
                          `Edit the reminder (${this.props.reminder.time}')`
                        :
                          'Set a new reminder'
                      }
                    onTouchTap={() => this.refs.newReminderPicker.show()}
                  />
                  {this.props.reminder ?
                    <MenuItem
                      primaryText="Delete the reminder"
                      onTouchTap={() => this.setNewReminder()}
                    />
                    : null}
                </IconMenu>
              </div>
            }
          </div>
        :
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 12,
            }}
          >
            <IconButton
              iconClassName="material-icons"
              tooltip="Mark as todo"
              iconStyle={{ color: grey600 }}
              onTouchTap={this.markTaskNotDone}
            >
              undo
            </IconButton>
            <IconButton
              iconClassName="material-icons"
              tooltip="Delete"
              iconStyle={{ color: grey600 }}
              style={{
                right: 48,
                position: 'absolute',
              }}
              onTouchTap={this.deleteTask}
            >
              delete
            </IconButton>
          </div>
        }
        <DatePickerDialog
          autoOk
          open={false}
          initialDate={this.props.dueDate}
          container="dialog"
          ref="newDayPicker"
          onAccept={this.setNewDay}
        />
        <TimePickerDialog
          autoOk
          open={false}
          initialTime={this.props.dueDate}
          container="dialog"
          format="ampm"
          ref="newTimePicker"
          onAccept={this.setNewTime}
        />
        <TimePickerDialog
          autoOk
          open={false}
          initialTime={this.getReminderTime()}
          container="dialog"
          format="24hr"
          ref="newReminderPicker"
          onAccept={this.setNewReminder}
        />
        <Popover
          open={this.state.tagsPopoverOpened}
          anchorEl={this.state.tagsPopoverAnchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          onRequestClose={this.handleTagsPopoverClose}
        >
          <Menu>
            <SubHeader>Set a tag</SubHeader>
              {this.props.availableTags ?
                this.props.availableTags.map(tag =>
                  <MenuItem
                    primaryText={`#${tag.name}`}
                    onTouchTap={() => {
                      this.handleTagsPopoverClose();
                      this.setTag(tag);
                    }}
                    leftIcon={
                      <FontIcon
                        style={{ color: tag.color ? tag.color : avatarBackgroundColor }}
                        className="material-icons"
                      >
                        {tag.icon ? tag.icon : 'label_outline'}
                      </FontIcon>
                    }
                  />
              ) : null}
          </Menu>
        </Popover>
      </ListItem>
    );
  }
}

/*
 <Avatar
 backgroundColor={tag.color ? tag.color : avatarBackgroundColor}
 color="white"
 onTouchTap={() => this.props.onTagChange(tag._id)}
 icon={tag.icon ?
 <FontIcon className="material-icons">{tag.icon}</FontIcon>
 : null}
 >
 {!tag.icon ? tag.name.charAt(0).toUpperCase() : null}
 </Avatar>
 */

Task.propTypes = {
  title: React.PropTypes.string,
  dueDate: React.PropTypes.instanceOf(Date),
  tag: React.PropTypes.object,
  done: React.PropTypes.bool,
  reminder: React.PropTypes.object,
  editing: React.PropTypes.bool,
  taskKey: React.PropTypes.string,
  onDateChange: React.PropTypes.func,
  availableTags: React.PropTypes.array,
  onReminderChange: React.PropTypes.func,
  onTagChange: React.PropTypes.func,
  onTaskUpdate: React.PropTypes.func,
  onTaskRemove: React.PropTypes.func,
};
