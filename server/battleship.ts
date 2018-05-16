const result = require('dotenv').config()     // The dotenv module will load a file named ".env"
// file and load all the key-value pairs into
// process.env (environment variable)
if (result.error) {
    console.log("Unable to load \".env\" file. Please provide one to store the JWT secret key");
    process.exit(-1);
}
if (!process.env.JWT_SECRET) {
    console.log("\".env\" file loaded but JWT_SECRET=<secret> key-value pair was not found");
    process.exit(-1);
}

import fs = require('fs');
import http = require('http');                // HTTP module
import colors = require('colors');
colors.enabled = true;

import mongoose = require('mongoose');

import { User } from './User';
import * as user from './User';
import {Message} from './Message';
import * as message from './Message';
import {Chat} from './Chat';
import * as chat from './Chat';

import express = require('express');
import bodyparser = require('body-parser');      // body-parser middleware is used to parse the request body and
// directly provide a Javascript object if the "Content-type" is
// application/json
import passport = require('passport');           // authentication middleware for express
import passportHTTP = require('passport-http');  // implements Basic and Digest authentication for HTTP (used for /login endpoint)
import jsonwebtoken = require('jsonwebtoken');  // JWT generation
import jwt = require('express-jwt');            // JWT parsing middleware for express
import cors = require('cors');                  // Enable CORS middleware
import io = require('socket.io');               // Socket.io websocket library
var ios = undefined;
var app = express();
var auth = jwt({ secret: process.env.JWT_SECRET });


app.use(cors());
// Install the top-level middleware "bodyparser"
app.use(bodyparser.json());


//Root Endpoint
app.get("/", (req, res) => {
    console.log("Called root endpoint".blue);
    res.status(200).json({ api_version: "1.0", endpoints: ["/users", "/chats", "/scoreboard", "/matches"] });
})

//Configure HTTP basic auth
passport.use(new passportHTTP.BasicStrategy(
    function (username, password, done) {
        console.log("Login from: ".green + username);
        user.getModel().findOne({ username: username }, (err, user) => {
            if (err) {
                return done({ statusCode: 500, error: true, errormessage: "Error fetching user" + err });
            }
            if (!user) {
                return done({ statusCode: 500, error: true, errormessage: "Invalid user" });
            }
            if (user.validatePassword(password)) {
                return done(null, user);
            }
            return done({ statusCode: 500, error: true, errormessage: "Password errata" });
        })
    }
));

//Renew Endpoint
app.get("/renew", auth, (req, res, next) => {
    console.log((req.user.username + " renew JWT").rainbow);
    var tokenrenew = req.user;
    delete tokenrenew.iat;
    delete tokenrenew.exp;
    var token_renew = jsonwebtoken.sign(tokenrenew, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.status(200).json({ error: false, errormessage: "", token: tokenrenew })
})

//Login Endpoint
app.get("/login", passport.authenticate("basic", { session: false }), (req, res, next) => {
    var tokendata = {
        username: req.user.username,
        isAdmin: req.user.isAdmin,
        mail: req.user.mail,
        id: req.user.id,
        name: req.user.name,
        surname: req.user.surname
    };
    var tokensigned = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.status(200).json({ error: false, errormessage: "", token: tokensigned });
})

//---------------------- User Endpoints ----------------------
app.route("/users/:username").get(auth, (req, res, next) => {
    console.log("Called endpoint user info with username: " + req.params.username);
    //Get /users/:username information
    user.getModel().findOne({ username: req.params.username }, { salt: 0, digest: 0 , _id: 0 , __v: 0}).then((user) => {
        return res.status(200).json(user);
    }).catch((reason) => {
        return next({ statusCode: 404, error: true, errormessage: "Error get user info: " + reason });
    })
}).put(auth, (req, res, next) => {
    //Update /users/:username information
    console.log("Called endpoint update user with username: " + req.params.username);
    if (!user.newUser(req.user).hasAdminRole() && user.newUser(req.user).username != req.params.username) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized" });
    }
    //Creo un user dummy al volo per calcolare digest e salt da inserire nell'utente da modificare
    var userdummy = user.newUser({
        name: "",
        surname: "",
        username: "",
        mail: ""
    });
    userdummy.setPassword(req.body.password);
    //TODO: manca da gestire la possibilità di diventare admin se un Admin lo concede aggiornando l'utente
    user.getModel().updateOne({ username: req.params.username }, { "$set": { "username": req.body.username, "name": req.body.name, "surname": req.body.surname, "mail": req.body.mail, "salt": userdummy.salt, "digest": userdummy.digest} }).then(() => {
        console.log(("User with username " + req.params.username + " updated").yellow);
        return res.status(200).json({ error: false, errormessage: "" });
    }).catch((error) => {
        return next({ statuscode: 404, error: true, errormessage: "MongoDB error: " + error });
    })
}).delete(auth, (req, res, next) => {
    //Delete /users/:username
    if (!user.newUser(req.user).hasAdminRole() && user.newUser(req.user).username != req.params.username) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized" });
    }
    user.getModel().deleteOne({ username: req.params.username }).then(() => {
        console.log(("User with username " + req.params.username + " deleted").red);
        return res.status(200).json({ error: false, errormessage: "" });
    }).catch((error) => {
        return next({ statuscode: 404, error: true, errormessage: "MongoDB error: " + error })
    })
})

app.route("/users").post((req, res, next) => {
    var new_user = user.newUser(req.body);
    if (!req.body.password) {
        return next({ statusCode: 500, error: true, errormessage: "Missing password" });
    }
    new_user.partitePerse =  0;
    new_user.partiteVinte =  0;
    new_user.setPassword(req.body.password);
    new_user.isAdmin = false;
    new_user.save().then((data) => {
        console.log(("User " + req.body.username + " saved succesfully").green);
        return res.status(200).json({ error: false, errormessage: "", id: data._id });
    }).catch((error) => {
        if (error.code === 11000)
            return next({ statusCode: 404, error: true, errormessage: "User already exists" })
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
    })
}).get(auth, (req, res, next) => {
    if (req.query.keysearched === undefined) {
        console.log("Called endpoint user search without word");
        user.getModel().find({},{ salt: 0, digest: 0, _id: 0, __v: 0, chatList: 0 }).then((documents) => {
            return res.status(200).json(documents);
        }).catch((error) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error })
        });
    }
    else {
        var keysearched = req.query.keysearched.toLowerCase();
        console.log("Called endpoint user search with word: " + keysearched);
        var filter = { $or: [{ username: new RegExp(keysearched, "i") }, { name: new RegExp(keysearched, "i") }, { surname: new RegExp(keysearched, "i") }] };
        user.getModel().find(filter, { salt: 0, digest: 0, _id: 0, __v: 0, chatList: 0 }).then((documents) => {
            return res.status(200).json(documents);
        }).catch((error) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
        })
    }
})

//---------------------- Chat Endpoints ----------------------
app.route("/chats").get(auth, (req, res, next) => {
    //Get all chats of auth user
    console.log(("Getting " + req.user.username + " chats").blue);
    user.getModel().find({username: req.user.username},{"chatList":1, "_id": 0}).then((documents) => {
        return res.status(200).json(documents);
    }).catch((error) => {
        return next({statusCode: 404, error: true, errormessage: "MongoDB error: " + error});
    })
}).post(auth, (req,res, next) => {
    var dest = req.body.destinatario;
    var id_dest = undefined;
    var id_sender = undefined;
    var date = Date.now();

    console.log(("Creating chat between " + req.user.username + " and " + dest).green);

    var query_id_dest = user.getModel().findOne({username: dest});
    var query_id_sender = user.getModel().findOne({username: req.user.username});

    var promise_query_id_dest = query_id_dest.exec();
    var promise_query_id_sender = query_id_sender.exec();

    Promise.all([promise_query_id_dest,promise_query_id_sender]).then(values => {
        id_dest = values[0]._id;
        id_sender = values[1]._id;
        var new_chat = chat.newChat({
            user1ID: id_sender,
            user2ID: id_dest,
            createdAt: date,
            listMessage: []
        });
        new_chat.save().then((data) => {
            console.log(("Chat between " + req.user.username + " and " + dest + " created").green);
            //Aggiorno la lista delle chat dei 2 utenti con quella apena creata
            var promise1 = user.getModel().update({_id: id_sender},{$push: {chatList: data._id}});
            var promise2 = user.getModel().update({_id: id_dest},{$push: {chatList: data._id}});
            Promise.all([promise1, promise2]).then(function() {
                console.log(("Chat addedd succesfully").green);
                return res.status(200).json({error: false, errormessage: ""});
            }).catch(function(error) {
                console.log("MongoDB error saving chats: " + error);
                return next({statusCode: 404, error: true, errormessage: "MongoDB error: " + error});
            });
        }).catch((error) => {
            if(error.code === 11000)
                return next({statusCode: 404, error: true, errormessage: "Chat already exists"});
            return next({statusCode: 404, error: true, errormessage: "MongoDB error: " + error});
        })
    }).catch((error) => {
        return next({statusCode: 404, error: true, errormessage: "MongoDB error retrieving ids for new chat: " + error});
    });
}).delete(auth, (req,res,next) => {
    //Endpoint di prova, cancella la chat con parametro destinatario nel body
    console.log(("Deleting chat between " + req.user.username + " and " + req.body.destinatario).zebra);

    var query_id_dest = user.getModel().findOne({username: req.body.destinatario});
    var query_id_sender = user.getModel().findOne({username: req.user.username});

    var promise_query_id_dest = query_id_dest.exec();
    var promise_query_id_sender = query_id_sender.exec();

    Promise.all([promise_query_id_sender,promise_query_id_dest]).then(values => {
        var query_get_id_chat  = chat.getModel().findOne({user1ID: values[0]._id,user2ID: values[1]._id});
        var query_delete_chat = chat.getModel().deleteOne({user1ID: values[0]._id,user2ID: values[1]._id});
        
        var promise_query_get_id_chat = query_get_id_chat.exec();
        var promise_query_delete_chat = query_delete_chat.exec();

        Promise.all([promise_query_get_id_chat,promise_query_delete_chat]).then(values2 => {
            user.getModel().update({chatList: values2[0]._id},{$set: {chatList: values2[0]._id, val: undefined}});
        }).catch((error) => {
            return next({statusCode: 404, error: true, errormessage: "MongoDB error: " + error});
        })

        /*
        chat.getModel().deleteOne({user1ID: values[0]._id,user2ID: values[1]._id}).then((data) => {
            console.log(("Chat deleted succesfully").zebra);
            return res.status(200).json({error: false, errormessage: ""});
        }).catch(function(error) {
            console.log("MongoDB error deleting chat: " + error);
            return next({statusCode: 404, error: true, errormessage: "MongoDB error: " + error});
        });*/
    });
})

//---------------------- Scoreboard Endpoints ----------------------
app.get("/scoreboard", (req,res,next) => {
    req.query.limit = parseInt( req.query.limit || "10" ) || 10;
    console.log(("Printing scoreboard with limit: " + req.query.limit).magenta);
    user.getModel().find({},{"username": 1, "partiteVinte": 1, "_id": 0}).sort({partiteVinte: -1}).limit(req.query.limit).then((documents) => {
        return res.status(200).json(documents);
    }).catch((error) => {
        return next({statusCode: 404, error: true, errormessage: "MongoDB error: " + error});
    })
})

//Error handling middleware
app.use(function (err, req, res, next) {
    console.log("Error middleware endpoint: ".red + JSON.stringify(err));
    res.status(err.statusCode || 500).json(err);
})

//Endpoint error 404 for request without endpoint
app.use((req, res, next) => {
    res.status(404).json({ error: true, errormessage: "Invalid endpoint" });
})


// Connect to mongodb and launch the HTTP server trough Express
//
mongoose.connect('mongodb://localhost:27017/battleship').then(
    function onconnected() {

        console.log("Connected to MongoDB");
        //Creating Admin
        var admin = user.newUser({
            name: "admin",
            surname: "admin",
            username: "admin",
            mail: "admin@battleship.it",
            partiteVinte: 0,
            partitePerse: 0
        });
        admin.setAdmin();
        admin.setPassword("ciaobelli");
        admin.save().then(() => {
            console.log("Admin created");
        }).catch((err) => {
            console.log("Unable to create admin user: " + err);
        });

        //Starting server
        let server = http.createServer(app);
        ios = io(server);
        ios.on('connection', function (client) {
            console.log("Socket.io client connected".green);
        });
        server.listen(8080, () => console.log("HTTP Server started on port 8080"));

    },
    function onrejected() {
        console.log("Unable to connect to MongoDB");
        process.exit(-2);
    }
)
