import axios from 'axios';
axios.defaults.withCredentials = true;

const DEPLOY = true;

const base = DEPLOY ? '' : 'http://localhost:3001';

const instance = axios.create({
  baseURL: base,
  timeout: 60000,
  headers: {
	  'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/* Defining conversation data interface as such:
Conversation: Message []
Message: {
  key: String, *index
	speaker: String, 'user' | 'program'
	actions: Action [], *only exist when the speaker is program
	body: String, *The actual message itself
}
Action: {
  name: String,
  type: String, enum
  messageKey: String, *the message that this action links to
}
*/

export function fetchConversationHistory(userId) {
	const requestUrl = `/user/${ userId }/conversation`;
	return instance.get(requestUrl);
}

export function fetchNextMessage(key, action) {
  const requestUrl = `/message/${key}`;
  return instance.post(requestUrl, {action});
}

export function fetchMessage(key) {
  const requestUrl = `/message/${key}`;
  return instance.get(requestUrl);
}

export function searchMessage(q) {
  const requestUrl = '/messages/search';
  return instance.post(requestUrl, {q});
}

export function addUpdateMessage(update) {
  const requestUrl = `/message`;
  return instance.post(requestUrl, update);
}

export function loginUser(username, password) {
  const requestUrl = '/user/login';
  return instance.post(requestUrl, {username, password});
}

export function logoutUser() {
  const requestUrl = '/user/logout';
  return instance.post(requestUrl);
}

export function registerUser(user) {
  const requestUrl = '/user/register';
  return instance.post(requestUrl, user);
}

export function fetchUser(id) {
  const requestUrl = `/user/${ id }`;
  return instance.get(requestUrl);
}

function extractMessage(message){
  /*not extracting selection and actions*/
  const { key, speaker, body, actions, selection } = message;
  return { key, speaker, body, actions, selection };
}

export function addUserBookmarks(username, bookmarks, name) {
  const requestUrl = `/user/${ username }/addbookmarks`;
  return instance.post(requestUrl, {bookmarks: 
    bookmarks.map((bm) => {return { name, folder: bm.folder, message: extractMessage(bm)};} ),
  });
}