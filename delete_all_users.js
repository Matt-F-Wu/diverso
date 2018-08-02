var mongoURL = process.env.HEROKU ? process.env.MONGODB_URI : 'mongodb://localhost/diverso';
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

var User = require('./schema/user.js');

User.remove({}).then(() => {
  console.log('Removed all user');
  mongoose.disconnect();
}).catch(() => {
  console.log('Cannot remove users, db error!');
  mongoose.disconnect();
});