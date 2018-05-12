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
    var tokenrenew = req.user;
    delete tokenrenew.iat;
    delete tokenrenew.exp;
    var token_renew = jsonwebtoken.sign(tokenrenew, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.status(200).json({ error: false, errormessage: "", token: tokenrenew })
})

//Login Endpoint
app.get("/login", passport.authenticate("basic", { session: false }), (req, res, next) => {
    console.log("Called endpoint Login");
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

//User Endpoints
app.route("/users/:mail").get(auth, (req, res, next) => {
    console.log("Called endpoint user info with email: " + req.params.mail);
    //Get /users/:mail information
    user.getModel().findOne({ mail: req.params.mail }, { salt: 0, digest: 0 , _id: 0 , __v: 0}).then((user) => {
        return res.status(200).json(user);
    }).catch((reason) => {
        return next({ statusCode: 404, error: true, errormessage: "Error get user info: " + reason });
    })
}).put(auth, (req, res, next) => {
    //Update /users/:mail information
    console.log("Called endpoint update user with email: " + req.params.mail);
    if (!user.newUser(req.user).hasAdminRole() && user.newUser(req.user).mail != req.params.mail) {
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
    user.getModel().updateOne({ mail: req.params.mail }, { "$set": { "username": req.body.username, "name": req.body.name, "surname": req.body.surname, "mail": req.body.mail, "salt": userdummy.salt, "digest": userdummy.digest} }).then(() => {
        console.log(("User with email " + req.params.mail + " updated").yellow);
        return res.status(200).json({ error: false, errormessage: "" });
    }).catch((error) => {
        return next({ statuscode: 404, error: true, errormessage: "MongoDB error: " + error });
    })
}).delete(auth, (req, res, next) => {
    //Delete /users/:mail
    if (!user.newUser(req.user).hasAdminRole() && user.newUser(req.user).mail != req.params.mail) {
        return next({ statusCode: 404, error: true, errormessage: "Unauthorized" });
    }
    user.getModel().deleteOne({ mail: req.params.mail }).then(() => {
        console.log(("User with email " + req.params.mail + " deleted").red);
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
        user.getModel().find({},{ salt: 0, digest: 0, _id: 0, __v: 0 }).then((documents) => {
            return res.status(200).json(documents);
        }).catch((error) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error })
        });
    }
    else {
        var keysearched = req.query.keysearched.toLowerCase();
        console.log("Called endpoint user search with word: " + keysearched);
        var filter = { $or: [{ username: new RegExp(keysearched, "i") }, { name: new RegExp(keysearched, "i") }, { surname: new RegExp(keysearched, "i") }] };
        user.getModel().find(filter, { salt: 0, digest: 0, _id: 0, __v: 0 }).then((documents) => {
            return res.status(200).json(documents);
        }).catch((error) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error })
        })
    }
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
            mail: "admin@battleship.it"
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
