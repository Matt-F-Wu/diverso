import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 60000,
  headers: {
	  'Content-Type': 'application/json',
  }
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