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
      return update(state, {
        userData: { $set: action.user },
      });
    case Actions.ADD_BOOKMARKS:
      /* action.addition must be an array */
      /* allow SET_BOOKMARKS to take control if no bookmarks exist */
      if (state.userData.bookmarks) {
        return update(state, {
          userData: {
            bookmarks: { $push: action.addition },
          },
        });
      }
    case Actions.SET_BOOKMARKS:
      return update(state, {
        userData: {
          bookmarks: { $set: action.bookmarks },
        },
      });
    default:
      return state;
  }
}

export default UserReducer;