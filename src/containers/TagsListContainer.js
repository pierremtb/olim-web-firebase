import { connect } from 'react-redux';
import TagsList from '../components/TagsList.jsx';
import C from '../constants';

function mapStateToProps(state) {
  const unitSystem = state.settings.unitSystem;
  return {
    tags: state.tags,
    dataLoading: state.dataLoading,
    unitSystem,
    tempUnit: unitSystem === C.IMPERIAL ? '°F' : '°C',
    weightUnit: unitSystem === C.IMPERIAL ? 'lbs' : 'kg',
  };
}

function mapDispatchToProps() {
  return {
    insertTag: tag => {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const tagRef = C.FIREBASE.app().database().ref(`users/${uid}/tags`);
      tagRef.push().set(tag);
    },
    updateTag: tag => {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const tagRef = C.FIREBASE.app().database().ref(`users/${uid}/tags/${tag.key}`);
      tagRef.set((tag));
    },
    removeTag: key => {
      const uid = C.FIREBASE.auth().currentUser.uid;
      const tagRef = C.FIREBASE.app().database().ref(`users/${uid}/tags/${key}`);
      tagRef.remove();
    },
  };
}

const TagsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsList);

export default TagsListContainer;
