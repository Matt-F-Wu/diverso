import { combineReducers } from 'redux';
import conversation from './components/Conversation/reducer';
import user from './components/User/reducer';

export default combineReducers({
	conversation,
  user,
});