/* 
  Alert: This file erase the entire database,
  This is extremely DANGEROUS!
  Please think twice before you run this file
*/

var mongoURL = process.env.HEROKU ? process.env.MONGODB_URI : 'mongodb://localhost/diverso';
var mongoose = require('mongoose');
mongoose.connect(mongoURL);

var User = require('./schema/user.js');
var { Message } = require('./schema/message.js');

/* Remove everything, extremely dangerous! */
var removePromises = [User.remove({}), Message.remove({})];

Promise.all(removePromises).then(() => {
  console.log('All data erased');
  mongoose.disconnect();
}).catch((err) => {
  console.log('Error erasing data', err.toString());
  mongoose.disconnect();
});