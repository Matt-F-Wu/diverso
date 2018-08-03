"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
/* jshint node: true */

var mongoose = require('mongoose');
var { messageSchema } = require('./message.js');

var bookmarkSchema = new mongoose.Schema({
  folder: { type: String, default: 'general' },
  name: { type: String, default: 'untitled', required: true },
  message: messageSchema,
});

// create a schema
var userSchema = new mongoose.Schema({
    username: { type: String, index: true },
    password_digest: String,
    salt: String,
    occupation: String,    // Occupation of the user.
    bookmarks: {type: [bookmarkSchema], default: []},
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
