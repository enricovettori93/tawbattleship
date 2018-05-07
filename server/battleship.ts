
import mongoose = require("mongoose");
import http = require("http");
import io = require("socket.io");
import express = require("express");
import colors = require("colors");
import {User} from "./User";
import * as user from "./User";

colors.enabled = true;
var ios = undefined;
var app = express();
mongoose.connect('mongodb://localhost:27017/battleship').then(
    function onconnected() {

        console.log("Connected to MongoDB");
        //Creating Admin
        var admin = user.newUser({
            name: "admin",
            surname: "admin",
            username: "admin",
            email: "admin@battleship.it"
        });
        admin.setAdmin();
        admin.setPassword("ciaobelli");
        admin.save().then(() => {
            console.log("Admin created");
        }).catch((err)=>{
            console.log("Unable to create admin user: " + err );
        });

        // To start a standard HTTP server we directly invoke the "listen"
        // method of express application
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
