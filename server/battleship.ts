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

//Root Endpoint
app.get("/",(req,res) => {
    res.status(200).json({api_v: 1, endpoints: ["/users","/chats","/scoreboard","/matches"]});
})

//Renew Endpoint
app.get("/renew",auth, (req,res,next) => {
    var tokenrenew = req.user;
    delete tokenrenew.iat;
    delete tokenrenew.exp;
    var token_renew = jsonwebtoken.sign(tokenrenew,process.env.JWT_SECRET,{expiresIn: "2h"});
    return res.status(200).json({error: false, errormessage: "",token: tokenrenew})
})

//Login Endpoint
app.get("/login",passport.authenticate("Basic",{session:false}),(req,res,next) => {
    var tokendata = {
        username: req.user.username,
        isAdmin: req.user.isAdmin,
        mail: req.user.mail,
        id: req.user.id,
        name: req.user.name,
        surname: req.user.surname
    };
    var tokensigned = jsonwebtoken.sign(tokendata,process.env.JWT_SECRET,{expiresIn: "2h"});
    return res.status(200).json({error: false, errormessage: "", token: tokensigned});
})

//User Endpoints
app.route("/users/:id").get(auth, (req,res,next) =>{
    //Get /users/:id information
    user.getModel().findOne({salt: 0,digest: 0}).then((users)=>{
        return res.status(200).json(users);
    }).catch((reason)=>{
        return next({statusCode: 404, error: true, errormessage: "Error: "+reason});
    })
}).put(auth,(req,res,next) => {
    //Update /users/:id information

}).delete(auth,(req,res,next) => {
    //Delete /users/:id
    if(!user.newUser(req.user).hasAdminRole()){
        return next({statusCode: 404, error:true, errormessage: "Unauthorized"});
    }
    user.getModel().deleteOne({id: req.params.id}).then(() => {
        return res.status(200).json({error: false, errormessage: ""});
    }).catch((error) => {
        return next({statuscode: 404, error: true, errormessage: "MongoDB error: "+error})
    })
})

app.post("/users",(req,res,next) => {
    var new_user = user.newUser(req.body);
    if(!req.body.password){
        return next({statusCode: 500, error: true, errormessage: "Missing password"});
    }
    new_user.setPassword(req.body.password);
    new_user.save().then((data) => {
        return res.status(200).json({error: false, errormessage: "", id: data._id});
    }).catch((error) => {
        if(error.code === 11000)
            return next({statusCode: 404, error: true, errormessage: "User already exists"})
        return next({statusCode: 404, error: true, errormessage: "MongoDB error: "+error});
    })
})

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
