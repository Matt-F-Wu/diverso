import axios from 'axios';
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: 'http://localhost:3001',
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
  const { key, speaker, actions, body } = message;
  return { key, speaker, actions, body };
}

export function addUserBookmarks(username, bookmarks, folder) {
  const requestUrl = `/user/${ username }/addbookmarks`;
  return instance.post(requestUrl, {bookmarks: 
    bookmarks.map((bm) => {return { folder, message: extractMessage(bm)};} ),
  });
}