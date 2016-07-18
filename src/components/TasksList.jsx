import React from 'react';
import { TasksGroup } from './TasksGroup.jsx';
import moment from 'moment';
import { TaskAdder } from './TaskAdder.jsx';
import Loading from './Loading.jsx';

export default function TasksList(props) {
  let tasks = props.tasks;
  if (props.routeParams.tagName) {
    tasks = tasks.filter(task => {
      const tag = props.tags.filter(t => t.key === task.tagKey)[0];
      return tag ? tag.name.toLowerCase() === props.routeParams.tagName : false;
    });
  }
  const overdueTasks = tasks.filter(task =>
    moment(task.dueDate, 'x').startOf('day').isBefore(moment().startOf('day')) &&
    !task.done
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

  return props.dataLoading ? <Loading /> : (
    <div>
      <TasksGroup
        tasks={overdueTasks}
        groupName={'Overdue'}
        availableTags={props.tags}
        onTaskUpdate={props.updateTask}
        onTaskRemove={props.removeTask}
      />
      <TasksGroup
        tasks={todayTasks}
        groupName={'Today'}
        availableTags={props.tags}
        onTaskUpdate={props.updateTask}
        onTaskRemove={props.removeTask}
      />
      <TasksGroup
        tasks={tomorrowTasks}
        groupName={'Tomorrow'}
        availableTags={props.tags}
        onTaskUpdate={props.updateTask}
        onTaskRemove={props.removeTask}
      />
      <TasksGroup
        tasks={nextSevenDaysTasks}
        groupName={'In the next 7 days'}
        availableTags={props.tags}
        onTaskUpdate={props.updateTask}
        onTaskRemove={props.removeTask}
      />
      <TasksGroup
        tasks={laterTasks}
        groupName={'Later'}
        availableTags={props.tags}
        onTaskUpdate={props.updateTask}
        onTaskRemove={props.removeTask}
      />
      <TaskAdder tasks={props.tasks} tags={props.tags} onTaskInsert={props.insertTask} />
    </div>
  );
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
};
