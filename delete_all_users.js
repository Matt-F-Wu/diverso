var mongoURL = process.env.HEROKU ? 'mongodb://heroku_06h81ms8:dflgio6jh53udefg28af0dfnhb@ds163781.mlab.com:63781/heroku_06h81ms8' : 'mongodb://localhost/diverso';
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