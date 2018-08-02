import * as Actions from './actions.js';
import update from 'react-addons-update';
import initialState from '../initialState';

const UserReducer = (state=initialState.user, action) => {
  switch (action.type) {
    case Actions.TOOGLE_IS_FETCHING:
      return update(state, {
        isFetching: { $set: action.boolean },
      });
    case Actions.SET_USER:
      /*when action.user is undefined, that means user logged out*/
      return update(state, {
        userData: { $set: action.userData },
      });
    default:
      return state;
  }
}

export default UserReducer;