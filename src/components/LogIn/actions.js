/* Define action types */
export const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
export const SET_BOOKMARKS = 'SET_BOOKMARKS';
export const ADD_BOOKMARKS = 'ADD_BOOKMARKS';
export const SET_USER = 'SET_USER';

/* Define actions */
export function toogleIsFetching(boolean) {
  return {
    type: TOOGLE_IS_FETCHING,
    boolean,
  };
}

export function setBookmarks(bookmarks) {
  return {
    type: SET_BOOKMARKS,
    bookmarks,
  };
}

export function addBookmarks(addition) {
  return {
    type: ADD_BOOKMARKS,
    addition,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  }
}