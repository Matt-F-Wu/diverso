/* Initial state for redux */
/* A starter conversation is required */

const convoStarter = [
  {key: 'greeting_goals_challenges', speaker: 'program', actions: [{name: 'What do you mean? What kinds of goals and how do you support them?', messageKey: 'goals_and_challenges_definition'}], body: [{type: 'text', value: "This is Diverso and I'm Diverso the bird. I'm a teacher and instructional coach. I help out around here by supporting teachers with their teaching related goals and challenges when they need advice."}]},
];


const initialState = {
	conversation: {
		isFetching: false,
    history: convoStarter,
	},
  user: {
    isFetching: false,
    userData: {},
  },
};

export default initialState;