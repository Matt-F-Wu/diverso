import { combineReducers } from 'redux';
import conversation from './components/Conversation/reducer';
import user from './components/LogIn/reducer';

export default combineReducers({
	conversation,
  user,
});