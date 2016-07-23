import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar.jsx';

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    tags: state.tags,
    userName: state.auth.userName,
  };
}

const NavigationBarContainer = connect(mapStateToProps)(NavigationBar);

export default NavigationBarContainer;
