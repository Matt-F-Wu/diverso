"use strict";
/*
 *  Hao: actionSchema should always be tide to a message, no dangling action allowed
 */
/* jshint node: true */

var mongoose = require('mongoose');

/* type could be 'message' or 'message_input'*/
var actionSchema = new mongoose.Schema({
  name: String,
  type: {type: String, default: 'message'},
  messageKey: String,
});

// create a schema for message, key is used as index
/* Type can either be 'text' or 'jsx' */
var messageSchema = new mongoose.Schema({
    key: { type: String, index: true },
    speaker: String,
    actions: [actionSchema],
    body: {type: [String], default: []},
    type: String,
});

// the schema is useless so far
// we need to create a model using it
var Message = mongoose.model('Message', messageSchema);

// make this available to our users in our Node applications
module.exports = {
  Message,
  messageSchema,
};
