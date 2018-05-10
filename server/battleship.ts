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
import http = require("http");
import colors = require("colors");
import mongoose = require("mongoose");
import express = require("express");
import bodyparser = require("body-parser");
import passport = require("passport");
import passportHTTP = require("passport-http");
import jsonwebtoken = require("jsonwebtoken");
import jwt = require("express-jwt");
import io = require("socket.io");
import cors = require("cors");

//Import TypeScript classes
import {User} from "./User";
import * as user from "./User";

//Settings some variables
var ios = undefined;
var app = express();
var auth = jwt({secret: process.env.JWT_SECRET});
app.use(cors);
app.use(bodyparser.json);
colors.enabled = true;

//Root Endpoint
app.get("/", (req,res) => {
    console.log("Called root endpoint".blue);
    res.status(200).json({api_version: "1.0", endpoints: ["/users","/chats","/scoreboard","/matches"]});
})

//Renew Endpoint
app.get("/renew", auth, (req,res,next) => {
    var tokenrenew = req.user;
    delete tokenrenew.iat;
    delete tokenrenew.exp;
    var token_renew = jsonwebtoken.sign(tokenrenew,process.env.JWT_SECRET,{expiresIn: "2h"});
    return res.status(200).json({error: false, errormessage: "",token: tokenrenew})
})

//Login Endpoint
app.get("/login", passport.authenticate("Basic",{session:false}), (req,res,next) => {
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
    }).catch((reason) => {
        return next({statusCode: 404, error: true, errormessage: "Error: "+reason});
    })
}).put(auth,(req,res,next) => {
    //Update /users/:id information
    //TODO: da controllare la seconda parte dell'or di questo if, non sono sicuro della sua correttezza
    if(!user.newUser(req.user).hasAdminRole() || user.newUser(req.user).id != req.params.id){
        return next({statusCode: 404, error:true, errormessage: "Unauthorized"});
    }
    //Creo un user dummy al volo per calcolare digest e salt da inserire nell'utente da modificare
    var userdummy = user.newUser({
        name: "",
        surname: "",
        username: "",
        mail: ""
    });
    userdummy.setPassword(req.params.password);

    user.getModel().updateOne({id: req.params.id},{"$set":{"name":req.params.name,"surname":req.params.surname,"mail":req.params.mail,"salt":userdummy.salt,"digest":userdummy.digest,"isAdmin":req.params.isAdmin}}).then(() => {
        return res.status(200).json({error: false, errormessage: ""});
    }).catch((error) => {
        return next({statuscode: 404, error: true, errormessage: "MongoDB error: "+error});
    })
}).delete(auth,(req,res,next) => {
    //Delete /users/:id
    //TODO: da controllare la seconda parte dell'or di questo if, non sono sicuro della sua correttezza
    if(!user.newUser(req.user).hasAdminRole() || user.newUser(req.user).id != req.params.id){
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

//Error handling middleware
app.use(function (err, req, res, next){
    console.log("Error: ".red + JSON.stringify(err));
    res.status(err.statusCode || 500).json(err);
})

//Endpoint error 404 for request without endpoint
app.use((req,res,next) => {
    res.status(404).json({error: true, errormessage: "Invalid endpoint"});
})

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
        }).catch((err) => {
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
