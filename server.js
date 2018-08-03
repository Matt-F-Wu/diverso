"use strict";

var mongoose = require('mongoose');
var async = require('async');
var session = require('express-session');
var bodyParser = require('body-parser');
// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var cors = require('cors');
/*The name 'Message' could be a little misleading, but Message is pretty much just the actual content*/
var { Message } = require('./schema/message.js');
var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
//SHA1 Hash password with salt
var hashService = require('./encryption.js');

var mongoURL = process.env.HEROKU ? process.env.MONGODB_URI : 'mongodb://localhost/diverso';
console.log(mongoURL);
mongoose.connect(mongoURL);

/* Enable CORS*/
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(cors({
    origin:['http://localhost:3000', 'http://localhost:3001'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(path.join(__dirname, 'client/build')));

//Add new middleware, the secret here should never be exposed to anyone!
app.use(session({secret: 'diverso_hao_matthew_wu', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());

// A middleware to check log-in
app.use(function(request, response, next){
    //If the user is not logged-in
    console.log(request.session);
    if(!request.session.username){
        //if the user wants to login or simply wants to chat
        if(request.originalUrl === '/user/login' || request.originalUrl === '/user/register' || request.originalUrl.startsWith('/message') || request.originalUrl === '/' || request.originalUrl.startsWith('/client')){
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

app.post('/user/login', function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    User.findOne({username}, function(err, user){
        if(err){
            // Some error happened
            response.status(400).send(JSON.stringify(err));
            return;
        }

        if(!user){
            //didn't find a user with username
            console.log("Account doesn't exist!");
            response.status(400).send("Account doesn't exist!");
            return;
        }
        if(hashService.doesPasswordMatch(user.password_digest, user.salt, password)){
            //password hash matched
            request.session.username = username;
            request.session.user_id = user._id;
            request.session.save(() => {  
                response.status(200).send(JSON.parse(JSON.stringify(user)));    
            });
        }else{
            //Wrong password
            response.status(400).send("Bad password!");
        }
        
    });
});

app.post('/user/logout', function(request, response){
    //Do I really need to delete the properties?
    delete request.session.username;
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
    var username = request.body.username; 
    var password = request.body.password; 
    var occupation = request.body.occupation;

    if(!username || !password){
        response
        .status(400)
        .send("Missing information, cannot signup");
    }
    //check if username already exist
    User.findOne({username: username}).exec(
        function(err, user){
            if(!user){
                //no user with the given login name
                var hashEntry = hashService.makePasswordEntry(password);

                User.create({
                    username: username, 
                    password_digest: hashEntry.hash,
                    salt: hashEntry.salt, 
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

app.post('/user/:username/addbookmarks', (request, response) => {
    var username = request.params.username;
    var bookmarks = request.body.bookmarks;
    console.log('received', bookmarks);
    User.findOne({username})
    .exec(function(err, user){
        if (err) {
            response.status(405).send('Server error');
            return;
        }
        if (user === null) {
            console.log('User with _id:' + id + ' not found.');
            response.status(400).send('User not found');
            return;
        }
        console.log(user.bookmarks);
        user.bookmarks = [...user.bookmarks, ...bookmarks];
        user.save(() => {
            response.status(200).send('bookmarks saved');
        });
    });
});

/* Used to return information about another user, not sure if we need this*/
app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    User.findOne({_id: id})
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
/* List all messages in the database */
app.get('/messages/list', function (request, response) {
    var messageQuery = Message.find({});
    messageQuery.exec(function(err, messages){
        if (err) {return errorLog(err);}
        response.status(200).send(messages);
    });

});

/* Search message based on pieces of content in the body */
app.post('/messages/search', function (request, response){
    const { q } = request.body;
    Message.findOne({"body.value": { "$regex": q, "$options": "i" } })
    .exec(function(err, message){
        if (!message) {
            response.status(404).send('message not found');
            return;
        }
        // message exist, find parent
        Message.findOne({"actions.messageKey" : message.key})
        .exec(function(error, parent){
            const reply = JSON.parse(JSON.stringify(message));
            if (parent) {
                reply.parentKey = parent.key;
                const actionFound = parent.actions.filter((a) => a.messageKey === message.key);
                if (actionFound.length > 0) {
                    reply.parentAction = actionFound[0].name;
                }
                
            }
            response.status(200).send(reply);
        });
    });
});

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

const port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


