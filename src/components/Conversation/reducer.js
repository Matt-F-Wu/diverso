import * as Actions from './actions.js';
import update from 'react-addons-update';
import initialState from '../initialState';

const ConversationReducer = (state=initialState.conversation, action) => {
  switch (action.type) {
    case Actions.TOOGLE_IS_FETCHING:
      return update(state, {
      	isFetching: { $set: action.boolean },
      });
    case Actions.SET_CONVERSATION:
      return update(state, {
        history: { $set: action.history },
      });
    case Actions.UPDATE_CONVERSATION:
      /* action.addition must be an array */
      return update(state, {
        history: { $push: action.addition },
      });
    default:
      return state;
  }
}

export default ConversationReducer;