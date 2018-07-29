/* Define action types */
export const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
export const SET_CONVERSATION = 'SET_CONVERSATION';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const UPDATE_LAST_MESSAGE = 'UPDATE_LAST_MESSAGE';
/* Define actions */
export function toogleIsFetching(boolean) {
	return {
		type: TOOGLE_IS_FETCHING,
		boolean,
	};
}

export function setConversation(history) {
  return {
    type: SET_CONVERSATION,
    history,
  };
}

export function updateConversation(addition) {
  return {
    type: UPDATE_CONVERSATION,
    addition,
  };
}

export function updateLastMessage(selection) {
  return {
    type: UPDATE_LAST_MESSAGE,
    selection,
  }
}