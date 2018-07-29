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
    case Actions.UPDATE_LAST_MESSAGE:
      return update(state, {
        history: { 
          [state.history.length - 1]: { $merge: action.selection},
        },
      });
    default:
      return state;
  }
}

export default ConversationReducer;