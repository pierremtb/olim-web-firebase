import { connect } from 'react-redux';
import TasksList from '../components/TasksList.jsx';
import C from '../constants';
import { getTaskMap } from '../utils';

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    tags: state.tags,
    dataLoading: state.dataLoading,
    drawerDocked: state.drawer.shouldBeDocked && state.drawer.wantItDocked,
  };
}

function mapDispatchToProps() {
  return {
    insertTask(task) {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const taskRef = C.FIREBASE.app().database().ref(`users/${uid}/tasks`);
      taskRef.push().set(getTaskMap(task));
    },
    updateTask(task) {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const taskRef = C.FIREBASE.app().database().ref(`users/${uid}/tasks/${task.taskKey}`);
      taskRef.set(getTaskMap(task));
    },
    removeTask(task) {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const taskRef = C.FIREBASE.app().database().ref(`users/${uid}/tasks/${task.taskKey}`);
      taskRef.remove();
    },
  };
}

const TasksListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);

export default TasksListContainer;
