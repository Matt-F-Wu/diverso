/* 
  This allows you to populate some starter data
*/
var mongoURL = process.env.HEROKU ? process.env.MONGODB_URI : 'mongodb://localhost/diverso';
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

var User = require('./schema/user.js');
var { Message } = require('./schema/message.js');
var strength_board = require('./resources/strength_board');

const { message1s, message2s } = require('./schema/data/symbolism_block.js');
const { message1t, message2t } = require('./schema/data/trust_block.js');

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

  {key: 'diverso_explained_1', speaker: 'program', actions: [{name: 'Thanks for looking out for me!', messageKey: ''}], body: [{type: 'text', value: "I’m glad! As a skilled teacher, you already know a lot. But there’s always room to learn new perspectives and be reminded of things you’ve learned in the past."}, {type: 'text', value: "And that’s the idea behind Diverso."}, {type: 'text', value: "You’re an expert and we want to make sure you keep becoming more expert. Everytime you come here to get help with a challenge or goal you’ll learn a little bit more about how you can be a culturally relevant teacher. Some of it will be new, and some of it might be a reminder."}]},

    {
      key: 'goals_list', speaker: 'program', actions: [{name: 'Relationship Building', messageKey: 'relationship_starter'}, {name: 'Breaching difficult conversation', messageKey: ''}, {name: 'Teaching Content', messageKey: ''}, {name: 'Increasing student Engagement', messageKey: ''}, {name: 'Building Student Self-Efficacy', messageKey: ''}, {name: 'Building a culture of respect between students', messageKey: 'challenge_decribe'}, {name: 'Hum.... I was looking for something else', messageKey: ''}], body: [{type: 'text', value: 'GREAT! I’d love to help. Which of the following categories does your goal or challenge fit into?'}]
    },

    {
      key: 'challenge_decribe', speaker: 'program', actions: [{name: '“My students aren’t very close. They seem to sit in clusters by race and ethnicity and I get the sense that some groups harbor biases against others. I wish I could help them feel a greater connection and appreciation for one another.”', messageKey: 'symbolism_1'}, {name: '“Some of my students make fun of one another (call each other names, call each other dumb when they get things wrong, etc) and I’m having trouble getting them to be more respectful.”', messageKey: ''}, {name: '“The other day one of my students called another one by a racial slur and I’m trying to plan my conversation with the student and the rest of the class about why that’s not ok.”', messageKey: ''}], body: [{type: 'text', value: 'AWESOME! Related to Building a culture of respect between your students, which of the following best describes your challenge?'}]
    },

    {
      key: 'big_idea_follow_up', speaker: 'program', actions: [{name: 'Sociopolitical context', messageKey: ''}, {name: 'Culture and learning', messageKey: 'culture_learning_challenges'}, {name: 'Identity', messageKey: ''}], body: [{type: 'text', value: 'GREAT! I’d love to help. Which of the following categories does the topic you want to talk about most closely relate to?'}]
    },

    {selection:"",key:"culture_learning_challenges",actions:[{type:"message",name:"What does culture have to do with learning?", messageKey: 'a01'}],"body":[{type:"text",value:"AWESOME! Related to Building a culture  of respect between your students, which of the following best describes your challenge?"}],speaker:"program"},

    {
      key: 'a01', speaker: 'program', body: [{type: 'text', value: 'I would love to have a conversation! And I would normally let you pick between some topics but all I’m prepared to tak about today is culture and learning. So let’s talk about that.'}, {type: 'jsx', value: '<div class="bubbleBase programBubble">So, what does culture have to do with learning?  My usual answer to this question is that culture has everything to do with <b>Teaching</b> and <b>Learning</b>.</div>'}, {type: 'jsx', value: '<div class="bubbleBase programBubble">Think of culture, among other things, as the <b>software that helps you interpret meaning from everyday events</b>; how to understand situations,  how to behave in given situations, and what to feel.</div>'}], actions: [{name: '“the software that helps you interpret meaning from everyday events” ... Can you give an example ?', messageKey: 'a02'}],
    },

    {
      key: 'a02', speaker: 'program', body: [{type: 'text', value: 'I can give a lot of examples!'}, {type: 'text', value: 'Check out one way of conceptualizing culture as a tree with 3 different levels. It comes from Zaretta Hammonds book, Culturally Responsive Teaching and the Brain. Look at each level of culture and consider how it shapes the way someone experiences the world.'}, {type: 'jsx', value: `<div class="generalJSXBubble">
        <img src="https://lh3.googleusercontent.com/ZOHyZFHttuU4We_30IQAgVU3EQ4qz9m07SwKd8-uo5YnfDyewBgltR6nz9RtU7Ee_5AKmOhD_1xJndfCFZuOl-xoWL2-xTJqgZNzov8ZMuw0H7iMnVG1Pb_D5tzTLThe5ap6IOi4L66_gob6jdjlbvMNJjB5WnMmULXSxuLpwsfF_YcRTMUi8hzY1r8SLiXrmWzk4Oj4GZzxIToVKVFQ78yoBAMKZ8CUvdSHkSs4DnfzA1e-pTnlgvb9B2TOkqSrvxCDLWwLjcduS6sbOX8aoypV1AwBQG4W3IoeBTTe_0YUWJ-gCmMbnUnZZ6zDF2J-tlyK4tU3JBxuGCXZqhfoyUl3f0DYX_mJG1qYkV2mtOetdhGMMVD5kcSeF7vYVc5EOQLoMbv84LbAc3PTMdVxjrG8V3zRR5k42oFnIeEqx6hnzResMR5rGjS-ZptD5oMW81evcS-TnX5UkVVCotRUXTbF6H5Y5uZZ5Z5uJDtNteT8i6j1lU7jRhBzsvRRrQ90nQ-VIipihaLmPOsP7PXI2gTBUaaOhp43dg6AqR3KHyyLGLcGt4MNyz1ERHfaXomey9ESF0lrfParZjiiNOp3Gf1WT5Ge1clJWHhmJqlLLEjzFinXyhQpIcRo3o-rIsGpDAxwCVlEV6mh4JjuozH-WunxvwSyt1oV=w951-h1199-no" />
        </div>`}], actions: [{name: 'Wow, that’s a lot to know...should I really know all of those things about my students?', messageKey: 'a03'}]
    },

    {
      key: 'a03', speaker: 'program', body: [{type: 'text', value: 'Kind of... but don’t worry, I’ll try and simplify it for you!'}], actions: [{name: 'Ok. I’ll trust you...', messageKey: 'a04'}]
    },

    {
      key: 'a04', speaker: 'program', body: [{type: 'text', value: 'And I’ll do my best make sure that trust isn’t misplaced!'}, {type: 'text', value: 'To start, there’s surface culture.'}, {type: 'text', value: 'Understanding your student’s everyday life experiences at the level of surface culture is crucial for designing effective instruction that connects new concepts to existing knowledge and understandings.'}, {type: 'text', value: 'As an example of how  impactful this connection is and how it can be done effectively when culture is used as a lense for instructional design, take a famous education initiative called The Algebra Project. If you have a moment, check out this YouTube video giving an overview of the project and then come back! You can watch just enough to get the gist.'}, {type: 'jsx', value: `<div class="generalJSXBubble"><iframe width="560" height="315" src="https://www.youtube.com/embed/s829QsGpwwA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`}], actions: [{name: 'I’ll watch the video some other time. Can you explain the projects for now?', messageKey: 'a04'}, {name: 'I watched it! And I think I get how the project designed instruction around surface culture. Can you explain to be sure?', messageKey: 'a05'}]
    },

    {
      key: 'a05', speaker: 'program', body: [{type: 'text', value: 'Of course! Let’s see if I can summarize.'}, {type: 'text', value: 'In the Algebra Project Bob Moses....'}], actions: [{name: 'Ok, I think I get how surface culture relates to instructional design now. It’s just taking the activities and practices that are most familiar to my students and using them to build connections to new concepts and skills, right?', messageKey: 'a06'}]
    },

    {
      key: 'a06', speaker: 'program', body: [{type: 'text', value: 'That’s right! I figured this was already pretty intuitive for you but I thought I would bring up the idea as a reminder. '}], actions: [{name: 'Reminders are always helpful. So what about shallow culture? How does it relate to learning or teaching?', messageKey: 'a07'}]
    },

    {
      key: 'a07', speaker: 'program', body: [{type: 'text', value: 'Right. Shallow Culture.'}, {type: 'text', value: 'Shallow culture has the most to do with building strong relationships with your students. If you want them to feel safe and comfortable in your class, then you have to understand how the unspoken rules for things like how they treat physical space, how they communicate with others, how they work together with others and how they handle emotions.'}, { type: 'text', value: 'Understanding these things about your students when trying to build good relationships with them and make them feel safe and comfortable in your class and during learning experiences is important so that your good intentions don’t backfire in misunderstandings. Kind of like this one:'}, {type: 'jsx', value: `<div class="generalJSXBubble">
        <img src="https://lh3.googleusercontent.com/_-u586EbxDWeenupWTQ0Yu3ub0eI8Hw07IweRC_R0kaVwInZMqEOU6Ehkbbj4IPi-eaIVcBRXswV7uaSRYFDHgREh6cTkjo252oj2XsU0QX0_Gwe4f2di3xaJdKCGsM8GiJujTDt7LyZq-iIt7oFQ99KzA0ZM3C8mqWnGvDkAVNcyXq3PIlsaR9B1SkgioWt_dhVD6D5sdZEondB3mGNMpiZPIgaKcDPB2V6xfLUY0uRlq0PZbsWS0YFqLtk-JDyoe5Y9-h7tEBKDeOECvyOr0jycN7ksQ40V1gaU_2sxeuBCxb1isLBGddJsy3rk0uizksaFT-kxs6svUlBS6Zi2xehQrnfFbzn3VTX3oJx5cvActuTLLixchzDyRN9B3AimYbqCtsE1uB3nhaXpR8kSwfo39wpG_Ic8KQFlsFdELJ1Sclh0JO7yce4YuWiiG-1lxt3wkiBm_YcdV75EqBI0hz04lrJjhPjPVgHqKe0f9UFjqbbDA5B0oZGgSr2quCKShnZQy7lfvrGvAkPWu-lsMigI7YYeW1E2pHE__hdP6y9c1o-9P4rpOLHsPl49xzA_knz0hIIoP-TpdTBxKCl7SGNYTiZXPxEoIWpxq4=w199-h240-no" />
        </div>`}], actions: [{name: 'Funny. Makes sense.', messageKey: 'a08'}]
    },

    {
      key: 'a08', speaker: 'program', body: [{type: 'text', value: 'I figured` this would already be pretty intuitive for you.'}], actions: [{name: 'And what about Deep Culture?', messageKey: 'a09'}]
    },

    {
      key: 'a09', speaker: 'program', body: [{type: 'text', value: 'Deep culture consists of our deepest values and beliefs about the world.'}, {type: 'text', value: 'One of the easiest ways to make sense of all the things you see as part of the deep culture tree roots is through the lenses of Collectivism and Individualism.'}], actions: [{name: 'Collectivism and Individualism... How do you relate those concepts to education?', messageKey: 'a10'}]
    },

    {
      key: 'a10', speaker: 'program', body: [{type: 'text', value: 'As Zaretta Hammond explains, collectivism and individualism offer fundamentally different ways the brain organizes itself. While most European cultures have been rooted in individualistic mindsets, collectivist mindsets have been common among Latin America, Asia, Africa, the Middle East and many Slavic cultures. '}, {type: 'text', value: 'Check out the chart to see the major differences between collectivist and individualistic cultures.'}, {type: 'jsx', value: `<div class="generalJSXBubble">
        <img style="width: 100%;" src="https://lh3.googleusercontent.com/YgpHVt1tUX2TsusuPCpEmlCvY2NIzLfpJKFB4AjFxzVODBt8aovwORAiTuqQICA2Mu25A_CpxT9ccZwJ7_WQken_A7p9uVpZTBtflN0o5UtM8QCk-R3-Iq0a0rpmc3bU8o0PqPxgbkBWqrVyKW-lWebwBvJKdCutOdIaFXX17jKPO4wni6VHPWRMTLIMD2YUPjjUwztg1xqukSvaEl5LkNxdGtRqW5loEiK4BlqolrPRH_MsmDq3_l6Y0Qil79mCCpRYP_-F2te_W7sNS1-08VGGyMkpdHXUpVT6gc8_30EO29C2iyHZRPzw_1cqvlJpFVmSPk_gedBm5wr8TW-UOUE3yYDtICAF_B5HXsJZSFU5qT0ZhyLoQpmpi13lm9wyymgsBRkqxUY9vos7Gmj7Ode7lDGCImt_uoznM7s2vIPjOGUJwLw5_UaUd-lm7jFZMd8FhJz3TDD6Jjvyfb4qLHTWi-5UZdbniyC1oZhwegk0WgIpCaMlDPNjkx1kgzyG4RDfNUtnqo8EtGhQwfzpXHvDefwKQYry9DE-QO-ktgn3st3brLNSl3afgqfmUH9zECJN0RTt_-csf-zWZeb5XRxXNFIxTWcIM6_aCQo=w1937-h1283-no" />
        </div>`}, {type: 'text', value: 'Keep in mind that Individualism and Collectivism exist on a continuum and that everyone is different. Just because someone is a person of color or because they have heritage from one of the places I listed above, doesn’t necessarily mean they are entirely collectivist in their values (or at all). '}, {type: 'text', value: 'Do you see how individualistic and collectivist values can imply different types of learning experiences?'}], actions: [{name: 'I think so...', messageKey: 'a11'}]
    },

    {
      key: 'a11', speaker: 'program', body: [{type: 'text', value: 'Great! Why don’t you share a little bit about how you think collectivist and individualistic values might call for different types of learning experiences? You can write your thoughts in the box below!'}, {type: 'jsx', value: "<textarea id='a11_textarea' style='border: 4px solid #E0E0E0; border-radius: 12px; background-color: #F3F3F3; width: 100%; min-height: 100px;'></textarea>"}], actions: [{name: 'Submit', type: 'message_input', messageKey: 'a12'}]
    },

    {
      key: 'a12', speaker: 'program', body: [{type: 'text', value: 'Interesting thoughts! Hear are some things that other teachers have told me about how they they think individualism and collectivism relate to learning experiences. You can compare their thoughts with your own!'}, {type: 'jsx', value: ``}, {type: 'text', value: 'So what do you think? What are your takeaways from our conversation about the three levels of culture and how they relate to learning? Did it make you think about your own practice as a teacher at all? I’ll share my summary after you share yours! '}, {type: 'jsx', value: "<textarea id='a12_textarea' style='border: 4px solid #E0E0E0; border-radius: 12px; background-color: #F3F3F3; width: 100%; min-height: 100px;'></textarea>"}], actions: [{name: 'Submit', type: 'message_input', messageKey: 'a13'}]
    },

    {
      key: 'a13', speaker: 'program', body: [{type: 'text', value: 'Nice summary - I like the way you worded your thoughts! Here are my takeaways for you to compare to:'}, {type: 'jsx', value: `<div class="bubbleBase programBubble mediumWidth"><p>Nice summary! Here are my takeaways for you to compare to: </p><ol><li>Culture  is a way of thinking about the things that color our lives and help us make sense of the world. Elements of culture can range from surface level customs, behaviors, and preferences to deep beliefs about how life should be lived.</li><li>Investigating your student’s surface culture is a powerful place to start when trying to find connections between new concepts and skills and the prior knowledge of your students. If you’re teaching a subject like Math, find the ways students are already participating in activities that have a mathematical nature and use those activities to explicitly teach a concept.</li><li>Understanding the norms of behavior and interpersonal relationships that your students come to school with is a way you can align your own behavior with what makes your students feel safe, comfortable, and capable in learning situations.</li><li>An easy place to start when adapting your classroom culture is to consider the ways in which your students would benefit from more collectivist driven work structures and explicit classroom values. </li></ol></div>` }], actions: [{name: 'Great. Thanks for the conversation!', messageKey: 'a14'}]
    },

    {
      key: 'a14', speaker: 'program', body: [{type: 'text', value: 'If you like found that set of content helpful and want to get advice on another goal or talk about something else, just let me know by using the navigation bar at the top!'}], actions: []
    },

    {
      key: 'relationship_starter', speaker: 'program', actions: [{type: 'message', name: '“I need help getting my students to be more excited about school. I need to show that I care and help them see that it is a place where everyone is here to help them succeed.”', messageKey: 'trust_generator_1'}, {type: 'message', name: '“One of my students has difficulty focusing on work in class. I need to work with them and more effectively shape my instruction to keep them engaged.”'}, {type: 'message', name: '“One of my students frequently comes to school sad. I need work with them and their support network to figure out how we can better meet their needs and make them feel more welcomed in school”'}], body: [{type: 'text', value: 'AWESOME! Related to Increasing Student Engagement, which of the following best describes your challenge?'}]
    },

    message1s,
    message2s,
    message1t,
    message2t,
];

const messagePromises = convoStarter.map((message) => Message.create(message));
Promise.all(messagePromises).then(() => {
  console.log('data populated');
  mongoose.disconnect();
}).catch((err) => {
  console.log('data population failed!', err.toString());
  mongoose.disconnect();
})