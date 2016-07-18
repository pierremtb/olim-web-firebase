import { connect } from 'react-redux';
import TasksList from '../components/TasksList.jsx';
// import { removeTask } from '../actions';
import C from '../constants';
// import { showDialog } from '../actions';
// import moment from 'moment';
import { getTaskMap } from '../utils';

function mapStateToProps(state) {
  const unitSystem = state.settings.unitSystem;
  return {
    tasks: state.tasks,
    tags: state.tags,
    unitSystem,
    tempUnit: unitSystem === C.IMPERIAL ? '°F' : '°C',
    weightUnit: unitSystem === C.IMPERIAL ? 'lbs' : 'kg',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    insertTask: (task) => {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const taskRef = C.FIREBASE.app().database().ref(`users/${uid}/tasks`);
      taskRef.push().set(getTaskMap(task));
    },
    updateTask: (task) => {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const taskRef = C.FIREBASE.app().database().ref(`users/${uid}/tasks/${task.taskKey}`);
      taskRef.set(getTaskMap(task));
    },
    removeTask: (key) => {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const taskRef = C.FIREBASE.app().database().ref(`users/${uid}/tasks/${key}`);
      taskRef.remove();
    },
  };
}

const TasksListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);

export default TasksListContainer;
