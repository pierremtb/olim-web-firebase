import { compose } from 'react-komposer';
import { TagsList } from '../components/TagsList.jsx';
import { Loading } from '../components/Loading.jsx';

function composer(params, onReady) {
  // const tasksSubscription = Meteor.subscribe('user-tasks');
  // const tagsSubscription = Meteor.subscribe('user-tags');
  // if (tasksSubscription.ready() && tagsSubscription.ready()) {
  //   const tasks = Tasks.find().fetch();
  //   const tags = Tags.find().fetch();
  //   onReady(null, { tasks, tags });
  // }
}

export default compose(composer, Loading)(TagsList);
