var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/diverso');

var User = require('./schema/user.js');

User.remove({}).then(() => {
  console.log('Removed all user');
  mongoose.disconnect();
}).catch(() => {
  console.log('Cannot remove users, db error!');
  mongoose.disconnect();
});