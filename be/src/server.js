"use strict";

var mongoose = require('mongoose');
var async = require('async');
var session = require('express-session');
var bodyParser = require('body-parser');
// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
/*The name 'Message' could be a little misleading, but Message is pretty much just the actual content*/
var { Message } = require('./schema/message.js');
var fs = require("fs");
var express = require('express');
var app = express();
//SHA1 Hash password with salt
var hashService = require('./encryption.js');

mongoose.connect('mongodb://localhost/diverso');

/* Enable CORS*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
  next();
});
// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

//Add new middleware, the secret here should never be exposed to anyone!
app.use(session({secret: 'diverso_hao_matthew_wu', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());

// A middleware to check log-in
app.use(function(request, response, next){
    //If the user is not logged-in
    if(!request.session.login_name){
        //if the user wants to login or simply wants to chat
        if(request.originalUrl === '/user/login' || request.originalUrl === '/user/register' || request.originalUrl.startsWith('/message') || request.originalUrl === '/'){
            next();
        }else if(request.originalUrl === '/user/logout'){
            //bad request, status 400
            response.status(400).send("No user logged-in");
            return;
        }else{
            response.status(401).send("Unauthorized, require log-in");
            return;
        }
    }else{
        //user is logged-in, call the next middleware
        next();
    }
    
});

// ======> User related REST calls <======

app.get('/', function (request, response) {
    response.send('Oops, nothing much here - Hao');
});

app.post('/user/login', function(request, response){
    var login_name = request.body.login_name;
    var password = request.body.password;
    User.findOne({login_name: login_name}, function(err, user){
        if(err){
            // Some error happened
            response.status(400).send(JSON.stringify(err));
            return;
        }

        if(!user){
            //didn't find a user with login_name
            console.log("Account doesn't exist!");
            response.status(400).send("Account doesn't exist!");
            return;
        }
        if(hashService.doesPasswordMatch(user.password_digest, user.salt, password)){
            //password hash matched
            request.session.login_name = login_name;
            request.session.user_id = user._id;            
            response.status(200).send(JSON.parse(JSON.stringify(user)));
        }else{
            //Wrong password
            response.status(400).send("Bad password!");
        }
        
    });
});

app.post('/user/logout', function(request, response){
    //Do I really need to delete the properties?
    delete request.session.login_name;
    delete request.session.user_id;
    console.log("Logging out now");
    request.session.destroy(function(err) {
        if(err){
            response.status(400).send("Sorry, an error occurred");
        }else{
            response.status(200).send('');
        }
    });

});

/* The user is registering a new account */
app.post('/user/register', function(request, response){
    //Do I really need to delete the properties?
    var login_name = request.body.login_name; 
    var password = request.body.password; 
    var first_name = request.body.first_name; 
    var last_name = request.body.last_name; 
    var location = request.body.location; 
    var description = request.body.description; 
    var occupation = request.body.occupation;

    if(!login_name || !password || !first_name || !last_name){
        response
        .status(400)
        .send("Missing information, cannot signup");
    }
    //check if login_name already exist
    User.findOne({login_name: login_name}).exec(
        function(err, user){
            if(!user){
                //no user with the given login name
                var hashEntry = hashService.makePasswordEntry(password);

                User.create({
                    login_name: login_name, 
                    password_digest: hashEntry.hash,
                    salt: hashEntry.salt, 
                    first_name: first_name, 
                    last_name: last_name, 
                    location: location, 
                    description: description, 
                    occupation: occupation
                }).then((user) => {
                    response
                    .status(200)
                    .send();
                }).catch((err) => {
                    response
                    .status(400)
                    .send(err.toString());
                });
            }else{
                // name taken
                response
                .status(400)
                .send("Login Name Already Exist, choose another one please");
            }
        }
        );

});

/* Used to return information about another user, not sure if we need this*/
app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    User.findOne({_id: id})
    .select("_id first_name last_name location description occupation")
    .exec(function(err, user){
        if (user === null) {
            console.log('User with _id:' + id + ' not found.');
            response.status(400).send('User not found');
            return;
        }
        response.status(200).send(user);
    });
});

// ======> Message related REST calls <======

/* Retrieveing a message */
app.get('/message/:key', function(request, response){
    var key = request.params.key;
    Message.findOne({key})
    .exec(function(err, message){
        if (message === null) {
            console.log('message with key' + key + ' not found.');
            response.status(400).send('message not found');
            return;
        }
        response.status(200).send(message);
    });
});

/* Retieving the next message given an action from a parent */
app.post('/message/:parent', function(request, response){
    const { parent } = request.params;
    const { action } = request.body;
    // console.log('received:', parent, action);
    Message.findOne({key: parent})
    .exec(function(err, parent){
        if (parent === null) {
            console.log('parent with key' + key + ' not found.');
            response.status(400).send('parent not found');
            return;
        }
        let actionFound = parent.actions.filter((a) => a.name === action);
        // console.log('found', actionFound);
        if (actionFound.length > 0) {
            const m_key = actionFound[0].messageKey;
            if (!m_key) {
                response.status(404).send('Linking message');
                return;
            }
            Message.findOne({key: m_key})
            .exec(function(err, message){
                if (message === null) {
                    console.log('message with key' + m_key + ' not found.');
                    response.status(400).send('message not found');
                    return;
                }
                response.status(200).send(message);
            });
        } else {
            response.status(404).send('action does not exist, need to create new one');
        }
    });

});

/* Inserting a new message 
or Updating an existing one */

/*Message:
    key: String,
    speaker: String,
    actions: [actionSchema],
    content: String,
    type: String,
*/
app.post('/message', function(request, response){
    const {
        parentKey,
        parentAction,
        relink,
        messageKey,
        messageBody,
        messageActions,
    } = request.body;

    Message.findOne({key: messageKey})
    .exec(function(err, message){
        if(!!err){
            response
            .status(400)
            .send('message key already in use! use a different one please');
            return;
        }
        if (!message) {
            /* message does not exist, insert*/
            Message.create({
                key: messageKey,
                actions: messageActions,
                body: messageBody,
                speaker: 'program',
            }).then((msg) => {
                if (!parentKey) {
                    /* This message has no parent, we are done */
                    response.status(200).send();
                    return;
                }
                /* Time to modify the parent*/
                Message.findOne({key: parentKey})
                .exec(function(err, parent){
                    if(!!err){
                        response.status(400).send('parent does not exist');
                        return;
                    }
                    if (parent) {
                        let foundAction = false;
                        parent.actions.forEach((a, i) => {
                            if (a.name === parentAction) {
                                foundAction = true;
                                parent.actions[i].messageKey = messageKey;
                                /* This action type is just a message */
                                parent.actions[i].type = 'message';
                            }
                        });
                        if (!foundAction) {
                            parent.actions.push({
                                name: parentAction,
                                messageKey: messageKey,
                                type: 'message',
                            });
                        }
                        /* Save modification to parent */
                        parent.save();
                        response.status(200).send();
                        return;
                    } else {
                        response.status(400).send('parent not found');
                        return;  
                    }
                });
                
            }).catch((err) => {
                response.status(400).send(err.toString());
            });
        } else {
            /* Message exist update */
            message.actions = messageActions;
            message.body = messageBody;
            message.save();
            response.status(200).send('message updated');
        }
    });
});

/* List all messages in the database */
app.get('/message/list', function (request, response) {
    var messageQuery = Message.find({});
    messageQuery.exec(function(err, messages){
        if (err) {return errorLog(err);}
        response.status(200).send(messages);
    });

});

var server = app.listen(3001, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


