/* Initial state for redux */
/* A starter conversation is required */

const bubbleS = "<div class='bubbleBase programBubble'>";
const bubbleE = "</div>";
const centerDiv = '<div style="display: flex; align-content: center; justify-content: center; margin-bottom: 8px;">';

const convoStarter = [
  {key: 'greeting_goals_challenges', speaker: 'program', actions: [{name: 'What do you mean? What kinds of goals and how do you support them?', messageKey: 'goals_and_challenges_definition'}], type: 'text', body: ["This is Diverso and I'm Diverso the bird. I'm a teacher and instructional coach. I help out around here by supporting teachers with their teaching related goals and challenges when they need advice."]},
];

const initialState = {
	conversation: {
		isFetching: false,
    history: convoStarter,
	},
  user: {
    isFetching: false,
    userData: {
      userId: 'haowu',
    },
  },
};

export default initialState;