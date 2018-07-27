/* Define action types */
export const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
export const SET_USER = 'SET_USER';

/* Define actions */
export function toogleIsFetching(boolean) {
  return {
    type: TOOGLE_IS_FETCHING,
    boolean,
  };
}

export function setConversation(userData) {
  return {
    type: SET_USER,
    userData,
  };
}