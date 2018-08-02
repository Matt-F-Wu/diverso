/* 
  This allows you to populate some starter data
*/
var mongoURL = process.env.HEROKU ? 'mongodb://heroku_06h81ms8:dflgio6jh53udefg28af0dfnhb@ds163781.mlab.com:63781/heroku_06h81ms8' : 'mongodb://localhost/diverso';
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

var User = require('./schema/user.js');
var { Message } = require('./schema/message.js');
var strength_board = require('./resources/strength_board');

const bubbleS = "<div class='bubbleBase programBubble'>";
const bubbleE = "</div>";
const centerDiv = '<div style="display: flex; align-content: center; justify-content: center; margin-bottom: 8px;">';

// Hao:
/* For a message of type input or message_input, the <textarea> must have an id that is the message's key concatenated with '_textarea'*/
const convoStarter = [
  {key: 'greeting_goals_challenges', speaker: 'program', actions: [{name: 'What do you mean? What kinds of goals and how do you support them?', messageKey: 'goals_and_challenges_definition'}], body: [{type: 'text', value: "This is Diverso and I'm Diverso the bird. I'm a teacher and instructional coach. I help out around here by supporting teachers with their teaching related goals and challenges when they need advice."}]},

  {key: 'goals_and_challenges_definition', speaker: 'program', actions: [{name: "Neat. Where do your principles and strategies come from?", messageKey: 'theory_intro_1' }], body: [{type: 'text', value: "Goals or challenges related to things like relationship building with students, promoting student engagment, and making curriculum content more accessible."}, {type: 'text', value: "I support teachers by connecting those goals and challenges to research-backed teaching principles and strategies. The goals and challenges can be related to a variety of things, such as relationship building or making the content more accessible and relevant to students."}]},

  {key: 'theory_intro_1', speaker: 'program', actions: [{name: 'Culturally Relevant Teaching... What’s that?', messageKey: 'crt_explained_1'}], body: [{type: 'text', value: "They come from my favorite body of theory and research called Culturally Relevant Teaching (CRT)."}]},

  {key: 'crt_explained_1', speaker: 'program', actions: [{name: 'Sounds important! So what does a culturally responsive teacher do?', messageKey: 'video_1'}], body: [{type: 'text', value: "CRT helps teachers like you design the most impactful and relevant learning experiences for your students by building on their cultural norms and prior knowledge."}, {type: 'text', value: "It especially helps you shape inclusive and powerful learning experiences for your culturally and linguistically diverse students. "}]},

  {key: 'video_1', speaker: 'program', actions: [{name: 'submit', messageKey: 'nice_take_away', type: 'message_input'}], body: [{type: 'text', value: "Good question! I suggest watching these two videos made by leading experts on culturally relevant teaching and pedagogy to start getting an idea."}, {type: 'jsx', value: centerDiv + '<iframe width="560" height="315" src="https://www.youtube.com/embed/3NycM9lYdRI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="margin-right: 8px;"></iframe><iframe width="560" height="315" src="https://www.youtube.com/embed/y7e-GC6oGhg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' + bubbleE}, {type: 'text', value: "So what do you think? Betweeen the two videos, what do you think Culturally Relevant or Responsive teachers are good at? You can share your thoughts in the box below!"}, {type: 'jsx', value: "<textarea id='video_1_textarea' style='border: 4px solid #E0E0E0; border-radius: 12px; background-color: #F3F3F3; width: 100%; min-height: 100px;'></textarea>"}]},

  {key: 'nice_take_away', speaker: 'program', actions: [{name: 'Awesome! I feel like I’m learning already!', messageKey: 'diverso_explained_1'}], body: [{type: 'text', value: "Nice takeaways! Here are my own thoughts regarding what cutlturally relevant teachers are good at doing:"}, {type: 'jsx', value: strength_board}, {type: 'text', value: "This is just a high level list. There’s more to say about each of these skills and I encourage you to refine this list and add to it as you keep learning!"}]},

  {key: 'diverso_explained_1', speaker: 'program', actions: [{name: 'Thanks for looking out for me!', messageKey: ''}], body: [{type: 'text', value: "I’m glad! As a skilled teacher, you already know a lot. But there’s always room to learn new perspectives and be reminded of things you’ve learned in the past."}, {type: 'text', value: "And that’s the idea behind Diverso."}, {type: 'text', value: "You’re an expert and we want to make sure you keep becoming more expert. Everytime you come here to get help with a challenge or goal you’ll learn a little bit more about how you can be a culturally relevant teacher. Some of it will be new, and some of it might be a reminder."}]}
];

const messagePromises = convoStarter.map((message) => Message.create(message));
Promise.all(messagePromises).then(() => {
  console.log('data populated');
  mongoose.disconnect();
}).catch((err) => {
  console.log('data population failed!', err.toString());
  mongoose.disconnect();
})