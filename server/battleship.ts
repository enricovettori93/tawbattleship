//Check if .env file exists
const result = require('dotenv').config();
if(result.error){
    console.log("Unable to load .env file.");
    process.exit(-1);
}
if(!process.env.JWT_SECRET){
    console.log("Can't find JWT secret in .env file.");
    process.exit(-1);
}

//Import libraries
import mongoose = require("mongoose");
import http = require("http");
import io = require("socket.io");
import express = require("express");
import colors = require("colors");
import passport = require("passport");
import passportHTTP = require("passport-http");
import jsonwebtoken = require("jsonwebtoken");
import jwt = require("express-jwt");
import bodyparser = require("body-parser");
import cors = require("cors");

//Import Typescript classes
import {User} from "./User";
import * as user from "./User";

//Settings some variables
var ios = undefined;
var app = express();
var auth = jwt({secret: process.env.JWT_SECRET});
colors.enabled = true;
app.use(cors);
app.use(bodyparser.json);

//Configure HTTP basic auth
passport.use(new passportHTTP.BasicStrategy(
    function(username, password, done){
        console.log("Login from: ".green + username);
        user.getModel().findOne({username: username},(err,user) => {
            if(err){
                return done({statusCode: 500, error: true, errormessage: err});
            }
            if(!user){
                return done({statusCode: 500, error: true, errormessage: err});
            }
            if(user.validatePassword(password)){
                return done(null, user);
            }
            return done({statusCode: 500, error: true, errormessage: "Password errata"});
        })
    }
));

//Start server only if mongoose connect to database
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
        }).catch((err)=>{
            console.log("Unable to create admin user: " + err );
        });

        // To start a standard HTTP server we directly invoke the "listen" method of express application
        let server = http.createServer(app);
        ios = io(server);
        ios.on('connection', function (client) {
            console.log("Socket.io client connected".green);
        });
        server.listen(8080, () => console.log("HTTP Server started on port 8080"));

        // To start an HTTPS server we create an https.Server instance 
        // passing the express application middleware. Then, we start listening
        // on port 8443
        //
        /*
        https.createServer({
          key: fs.readFileSync('keys/key.pem'),
          cert: fs.readFileSync('keys/cert.pem')
        }, app).listen(8443);
        */
    },
    function onrejected() {
        console.log("Unable to connect to MongoDB");
        process.exit(-2);
    }
)
