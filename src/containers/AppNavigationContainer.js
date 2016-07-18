import { compose } from 'react-komposer';
import { AppNavigation } from '../components/AppNavigation.jsx';
import { EmptyLoading } from '../components/EmptyLoading.jsx';
import auth from '../auth.js';

function composer(params, onReady) {
  // const tagsSubscription = Meteor.subscribe('user-tags');
  // if (tagsSubscription.ready()) {
  //   const tags = Tags.find().fetch();
  //   onReady(null, { tags, isUser: Meteor.user() });
  // }
  onReady(null, { tags: [], isUser: auth.isLoggedIn() });
}

export default compose(composer, EmptyLoading)(AppNavigation);
