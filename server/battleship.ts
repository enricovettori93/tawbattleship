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
import { Message } from './Message';
import * as message from './Message';
import { Chat } from './Chat';
import * as chat from './Chat';
import { Match } from './Match';
import * as match from './Match';
import { Field } from './Field';
import * as field from './Field';

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
                return done({ statusCode: 500, error: true, errormessage: "Utente non valido" });
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
    console.log(req.user);
    if (req.user.remindMe) {
        console.log((req.user.username + " renew JWT").rainbow);
        var tokendata = {
            username: req.user.username,
            isAdmin: req.user.isAdmin,
            mail: req.user.mail,
            id: req.user.id,
            name: req.user.name,
            surname: req.user.surname,
            remindMe: true
        };
        var token_renew = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ error: false, errormessage: "", token: token_renew });
    }
    else {
        return res.status(400).json({ error: true, errormessage: "Remindme not setted, please do the login again" });
    }
});


// Login Endpoint
// TODO sanitize the user request 
app.get("/login", passport.authenticate("basic", { session: false }), (req, res, next) => {

    var remindMe;
    if (req.query.remindMe) {
        remindMe = true;
    } else {
        remindMe = false;
    }
    var tokendata = {
        username: req.user.username,
        isAdmin: req.user.isAdmin,
        mail: req.user.mail,
        id: req.user.id,
        name: req.user.name,
        surname: req.user.surname,
        remindMe: remindMe
    };
    let expTime: string;
    if (remindMe) {
        expTime = "7d";
    } else {
        expTime = "4h";
    }
    var tokensigned = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: expTime });
    return res.status(200).json({ error: false, errormessage: "", token: tokensigned });
})

//---------------------- User Endpoints ----------------------
app.route("/users/:username").get(auth, (req, res, next) => {
    console.log("Called endpoint user info with username: " + req.params.username);
    //Get /users/:username information
    user.getModel().findOne({ username: req.params.username }, { salt: 0, digest: 0, __v: 0 }).then((user) => {
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
    if (req.body.password === undefined) {
        //Utente admin non modifica i dati dell'altro utente, ma solo l'attributo isAdmin
        if (!req.user.isAdmin) {
            return res.status(500).json({ error: true, errormessage: "User is not admin" });
        }
        user.getModel().updateOne({ username: req.body.username }, { "$set": { "isAdmin": req.body.isAdmin } }).then(() => {
            console.log(("User with username " + req.body.username + " updated").yellow);
            return res.status(200).json({ error: false, errormessage: "" });
        }).catch((error) => {
            return next({ statuscode: 404, error: true, errormessage: "MongoDB error: " + error });
        })
    }
    else {
        //Creo un user dummy al volo per calcolare digest e salt da inserire nell'utente da modificare
        var userdummy = user.newUser({
            name: "",
            surname: "",
            username: "",
            mail: ""
        });
        userdummy.setPassword(req.body.password);
        user.getModel().updateOne({ username: req.params.username }, { "$set": { "username": req.body.username, "name": req.body.name, "surname": req.body.surname, "mail": req.body.mail, "salt": userdummy.salt, "digest": userdummy.digest, "isAdmin": req.body.isAdmin } }).then(() => {
            console.log(("User with username " + req.params.username + " updated").yellow);
            return res.status(200).json({ error: false, errormessage: "" });
        }).catch((error) => {
            return next({ statuscode: 404, error: true, errormessage: "MongoDB error: " + error });
        })
    }
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

app.get("/users/:username/matches", auth, (req, res, next) => {
    user.getModel().findOne({ username: req.params.username }).then((data) => {
        match.getModel().find({ "$or": [{ owner: data._id }, { opponent: data._id }] }).then((matches) => {
            return res.status(200).json(matches);
        }).catch((err) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + err })
        })
    }).catch((err) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + err })
    })
})

app.route("/users").post((req, res, next) => {
    var new_user = user.newUser(req.body);
    if (!req.body.password) {
        return next({ statusCode: 500, error: true, errormessage: "Password mancanti" });
    }
    new_user.partitePerse = 0;
    new_user.partiteVinte = 0;
    new_user.setPassword(req.body.password);
    new_user.isAdmin = false;
    new_user.save().then((data) => {
        console.log(("User " + req.body.username + " saved succesfully").green);
        return res.status(200).json({ error: false, errormessage: "", id: data._id });
    }).catch((error) => {
        if (error.code === 11000)
            return next({ statusCode: 404, error: true, errormessage: "il nome utente o la email sono già state usate" })
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
    })
}).get(auth, (req, res, next) => {
    if (req.query.keysearched === undefined) {
        console.log("Called endpoint user search without word");
        user.getModel().find({}, { salt: 0, digest: 0, _id: 0, __v: 0, chatList: 0 }).then((documents) => {
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
    user.getModel().find({ username: req.user.username }, { "chatList": 1, "_id": 0 }).populate({ path: 'chatList', model: chat.getModel(), populate: [{ path: 'user1ID', model: user.getModel(), select: 'username _id' }, { path: 'user2ID', model: user.getModel(), select: 'username _id' }] }).then((documents) => {
        return res.status(200).json(documents);
    }).catch((error) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
    })
}).post(auth, (req, res, next) => {
    var dest = req.body.destinatario;
    var id_dest = undefined;
    var id_sender = undefined;
    var date = Date.now();

    console.log(("Creating chat between " + req.user.username + " and " + dest).green);

    var query_id_dest = user.getModel().findOne({ username: dest });
    var query_id_sender = user.getModel().findOne({ username: req.user.username });

    var promise_query_id_dest = query_id_dest.exec();
    var promise_query_id_sender = query_id_sender.exec();

    Promise.all([promise_query_id_dest, promise_query_id_sender]).then(values => {
        id_dest = values[0]._id;
        id_sender = values[1]._id;
        var new_chat = chat.newChat({
            user1ID: id_sender,
            user2ID: id_dest,
            createdAt: date,
            listMessage: []
        });
        new_chat.save().then((data) => {
            console.log(("Chat between " + req.user.username + " and " + dest + " created.\ninfo chat" + JSON.stringify(data)).green);
            //Aggiorno la lista delle chat dei 2 utenti con quella apena creata
            var promise1 = user.getModel().update({ _id: id_sender }, { $push: { chatList: data._id } });
            var promise2 = user.getModel().update({ _id: id_dest }, { $push: { chatList: data._id } });
            Promise.all([promise1, promise2]).then(function () {
                console.log(("Chat addedd succesfully").green);
                return res.status(200).json({ error: false, errormessage: "", id: new_chat._id });
            }).catch(function (error) {
                console.log("MongoDB error saving chats: " + error);
                ios.emit('error', 'MongoDB error:' + error);
                return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
            });
        }).catch((error) => {
            if (error.code === 11000)
                return next({ statusCode: 404, error: true, errormessage: "Chat already exists" });
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
        })
    }).catch((error) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error retrieving ids for new chat: " + error });
    });
})

app.route("/chats/:id").get(auth, (req, res, next) => {
    chat.getModel().find({ "_id": req.params.id }).populate({ path: 'listMessage', model: message.getModel(), select: 'sentAt text senderID -_id idChat' }).then((chat) => {
        //La chat per forza è univoca con l'id, quindi documents avrà un singolo elemento
        if (chat[0].user1ID == req.user.id || chat[0].user2ID == req.user.id) {
            return res.status(200).json(chat);
        }
        return res.status(200).json({ statusCode: 500, error: true, errormessage: "User not allowed to see this chat" });
    }).catch((error) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error })
    })
}).post(auth, (req, res, next) => {
    let chatModel = chat.getModel();
    chatModel.find({ "_id": req.params.id }).then((chat) => {
        if (chat[0].user1ID == req.user.id || chat[0].user2ID == req.user.id) {
            var new_message = message.newMessage({
                idChat: req.params.id,
                sentAt: req.body.sentAt,
                text: req.body.text,
                senderID: req.user.id
            });
            new_message.save().then((data) => {
                chatModel.updateOne({ "_id": req.params.id }, { $push: { listMessage: new_message._id } }).then((response) => {
                    /**
                     * Emette il segnale nel socket riguardante la specifica chat passata tramite parametro
                     */
                    ios.emit('broadcast ' + req.params.id, data);
                    /**
                     * Emette un segnale nel socket del ricevente per segnalare una nuova chat
                     */
                    if (new_message.senderID == chat[0].user1ID) {
                        ios.emit('new_message_for ' + chat[0].user1ID, new_message);
                    }
                    else {
                        ios.emit('new_message_for ' + chat[0].user2ID, new_message);
                    }
                    return res.status(200).json({ error: false, errormessage: "" });
                }).catch((err) => {
                    return next({ statusCode: 500, error: true, errormessage: "MongoDB error saving message into chat: " + err })
                })
            }).catch((err) => {
                return next({ statusCode: 500, error: true, errormessage: "MongoDB error saving message: " + err })
            })
        }
        else {
            return res.status(200).json({ statusCode: 500, error: true, errormessage: "User not allowed to modify this chat" });
        }
    }).catch((err) => {
        return next({ statusCode: 500, error: true, errormessage: "MongoBD error: " + err });
    })
}).delete(auth, (req, res, next) => {
    chat.getModel().findOne({ '_id': req.params.id }, {}).then((retChat) => {
        if (req.user.id == retChat.user1ID || req.user.id == retChat.user2ID) {
            //L'utente che ha fatto richiesta di cancellare è uno dei 2 partecipanti
            var query_delete_chat = chat.getModel().deleteOne({ '_id': req.params.id });
            var query_delete_chat_from_user = user.getModel().updateMany({}, { $pull: { chatList: req.params.id } });
            var promise_query_delete_chat = query_delete_chat.exec();
            var promise_query_delete_chat_from_user = query_delete_chat_from_user.exec();
            Promise.all([promise_query_delete_chat, promise_query_delete_chat_from_user]).then(values => {
                console.log("Chat " + req.params.id + " deleted");
                return res.status(200).json({ error: false, errormessage: "" });
            }).catch((error) => {
                return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
            })
        }
        else {
            //L'utente è un intruso
            return next({ statusCode: 400, error: true, errormessage: "Utente non autorizzato a cancellare la chat" });
        }
    }).catch((error) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
    });
})

//---------------------- Scoreboard Endpoints ----------------------
app.get("/scoreboard", auth, (req, res, next) => {
    req.query.limit = parseInt(req.query.limit || "10") || 10;
    req.query.type = (req.query.type || "undefinied") || "undefinied";
    let type = req.query.type;
    switch (type) {
        case "undefinied": {
            type = "partiteVinte";
            break;
        }
    }
    console.log(("Printing scoreboard with limit: " + req.query.limit + " and type: " + type).magenta);
    if (req.query.type === "total") {
        user.getModel().aggregate([
            { $match: {} },
            {
                $project: {
                    'username': '$username',
                    'total': { $add: ['$partiteVinte', '$partitePerse'] }
                }
            }
        ]).sort({ 'total': -1 }).then((documents) => {
            return res.status(200).json(documents);
        }).catch((error) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
        })
    }
    else {
        user.getModel().find({}, { username: 1, [type]: 1, _id: 0 }).sort({ [type]: -1 }).limit(req.query.limit).then((documents) => {
            return res.status(200).json(documents);
        }).catch((error) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
        })
    }
})

//---------------------- Match Endpoints ---------------------------

app.route("/matches").get(auth, (req, res, next) => {
    // Gets all waiting matches 
    match.getModel().find({ "status": match.MatchStatus.Wait }).populate({ path: 'owner', model: user.getModel(), select: 'username _id' }).then((documents) => {
        return res.status(200).json(documents);
    }).catch((error) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
    })
}).post(auth, (req, res, next) => {
    // Creates a new match with the auth user as owner
    let new_match = match.newMatch(req.user.id)
    match.getModel().find({"owner": req.user.id, "status": match.MatchStatus.Ended}).count().then((waitingMatches) => {

        match.getModel().find({ "owner": req.user.id}).count().then((data) => {
            console.log(waitingMatches);
            console.log(data);

            // L'utente non deve avere altri match in corso per poterne creare uno nuovo.
            if (JSON.stringify(data-waitingMatches) === "0") {
                new_match.save().then((data) => {
                    console.log(("Match created succesfully. Owner UID: " + data.owner).green);
                    ios.emit("new match added", {});
                    return res.status(200).json({ error: false, errormessage: "", id: data._id });
                }).catch((error) => {
                    return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + error });
                })
            }
            else {
                return res.status(400).json({ error: true, errormessage: "User already got waiting match" });
            }
        }).catch((err) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + err });
        })
    })
})

app.put("/matches/:id/board", auth, (req, res, next) => {

    // Inserts ships for the auth user fighting in the :id match
    match.getModel().findOne({ "_id": req.params.id }).then((data) => {
        if (req.user.id == data.owner || req.user.id == data.opponent) {

            // Non si possono inserire le navi se il match non è nello stato Building.
            if (data.getStatus() != match.MatchStatus.Building) {
                return res.status(404).json({ error: true, errormessage: "Cannot add ships now!" });
            }
            else {
                try {
                    data.insertField(req.user.id, req.body.positioning).then(
                        (success) => {
                            ios.emit('broadcast ' + data._id, data);
                            return res.status(200).json({ error: false, errormessage: "" });
                        }, (error) => {
                            console.log("something goes wrong " + error);
                        }
                    );
                }
                catch (e) {
                    return res.status(400).json({ error: true, errormessage: "Invalid ship positioning " + e });
                }
            }
        }
        else {
            return res.status(400).json({ error: true, errormessage: "User not allowed to modify this match" });
        }
    }).catch((err) => {
        return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + err });
    })
})

app.get("/matches/:id_match", auth, (req, res, next) => {

    // Gets ":id_match" match information. 
    // If type=fullInfo, returns information also about users and fields:
    //      the field of the user fighting against auth user is anonymized, 
    //      so that auth user can't see what is contained inside cells not checked yet.

    req.query.type = (req.query.type || "undefined");
    var type = req.query.type;
    if (type == "undefined") {

        match.getModel().findOne({ "_id": req.params.id_match }).then((match) => {
            return res.status(200).json(match);
        }).catch((err) => {
            return next({ statusCode: 404, error: true, errormessage: "MongoDB error: " + err });
        })

    }
    else {
        let myBoard, opponentBoard, me, opponent;
        match.getModel().findOne({ "_id": req.params.id_match })
            .populate({ path: "opponent", select: "username" })
            .populate({ path: "owner", select: "username" })
            .populate({ path: "fieldOwner"})
            .populate({ path: "fieldOpponent"}).lean().exec().then((match) => {
                if (match.owner._id.toString() === req.user.id) {
                    myBoard = "fieldOwner";
                    me = "owner";
                    opponent = "opponent";
                    opponentBoard = "fieldOpponent";
                }
                else {
                    me = "opponent";
                    opponent = "owner";
                    myBoard = "fieldOpponent";
                    opponentBoard = "fieldOwner"
                }
                var opponentMatrix;
                var opponentShips;

                delete match[opponentBoard].ships;
                opponentMatrix = match[opponentBoard].matrix.slice(0);

                // Le informazioni riguardo al campo dell'avversario dell'utente auth sono oscurate
                for(var i = 0; i<=9; i++){
                    for(var j = 0; j<=9; j++){
                        if(!opponentMatrix[i][j].hit)
                            opponentMatrix[i][j] = new field.Cell(field.cellColor.unknown);
                    }
                }

                match["userBoard"] = match[myBoard];
                match["opponentBoard"] = match[opponentBoard];
                match["opponentBoard"]["matrix"] = opponentMatrix;
                match["userInfo"] = match[me];
                match["opponentInfo"] = match[opponent];

                delete match[myBoard];
                delete match[opponentBoard];
                delete match[me];
                delete match[opponent];
                console.log(match);
                return res.status(200).json(match);
            }).catch((err) => {
                return next({ statusCode: 500, error: true, errormessage: "MongoDB error: " + err });
            })

    }


})

//endpoint temporaneo per il controllo della costruzione dei campi
/*app.get("/fields", auth, (req, res, next) => {

    field.getModel().find().then((data) => {
        return res.status(200).json(data);
    })
})*/

app.put("/matches/:id_match/join", auth, (req, res, next) => {
    // Updates ":id_match" match informations, adding auth user as the opponent user in this match.
    match.getModel().find({ "$or": [{ "owner._id": req.user.id }, { "opponent._id": req.user.id }] }).count().then((data) => {

        // L'utente non può joinare un match se è già coinvolto in un altro.
        if (data === 0) {
            match.getModel().findOne({ "_id": req.params.id_match }).then((data) => {
                if (data.status != match.MatchStatus.Wait) {
                    return res.status(400).json({ error: true, errormessage: "Match already setted up" });
                }
                else {
                    let random = Math.floor((Math.random()*2) + 1);
                    let beginner;
                    if(random == 1){
                        beginner = data.owner;
                    }
                    else{
                        beginner = mongoose.Types.ObjectId(req.user.id);
                    }
                    match.getModel().findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id_match),
                        {
                            "opponent": { "_id": mongoose.Types.ObjectId(req.user.id) },
                            "status": match.MatchStatus.Building,
                            "lastIdAttacker": beginner
                        }).then(
                            (resolve) => {
                                //console.log("Socket transmission".rainbow);
                                //console.log(("data._id: " + data._id).red);
                                //data.status = match.MatchStatus.Building;
                                ios.emit('broadcast ' + data._id, resolve);
                                return res.status(200).json({ error: false, errormessage: "" });
                            },
                            (reject) => {
                                return res.status(400).json({ error: true, errormessage: "An error occured: " + reject });
                            }
                        );
                }
            })
        }
        else {
            return res.status(400).json({ error: true, errormessage: "User already fighting in a different match." });
        }
    })
})


app.put("/matches/:id_match", auth, (req, res, next) => {
        // Updates ":id_match" match information, shooting at the position specified inside the body.
        // Shoot position format: { "position" : {"x" : Number, "y" : Number}}
        match.getModel().findOne({ "_id": req.params.id_match }).then((returnmatch) => {

            // If auth user shot last, cannot shoot again
            if(returnmatch.lastIdAttacker == req.user.id){
                return res.status(400).json({error: true, errormessage: "This user already attacked!"})
            }
            else{
                var fieldLabel, campo;
                if (returnmatch["owner"] == req.user.id) {
                    fieldLabel = "fieldOpponent";
                }
                else {
                    fieldLabel = "fieldOwner";
                }
                campo = returnmatch[fieldLabel];
                field.getModel().findOne({ "_id": campo }).then((data) => {
                    try{
                        data.shoot(req.body.position);
                    }catch (error){
                        return res.status(500).json({error: true, errormessage: error});
                    }
                    match.getModel().findOneAndUpdate({"_id": req.params.id_match}, {"lastIdAttacker": { "_id": mongoose.Types.ObjectId(req.user.id)}}).exec()
                    //console.log('match update ' + req.params.id_match);
                    ios.emit('match update ' + req.params.id_match, {lastIdAttacker:req.user.id});
                    //console.log(data.aliveShips)

                    // If there are no Ships alive, the match ends and auth user won this game.
                    if (data.aliveShips == 0){

                        match.getModel().findOneAndUpdate({"_id":req.params.id_match},{"winnerId": req.user.id, "status": match.MatchStatus.Ended}).then((ritorno) => {
                            let partiteVincitore;
                            user.getModel().findOne({"_id":req.user.id}).then((userret) => {

                                // Aggiorno le informazioni del vincitore.
                                partiteVincitore = userret.partiteVinte;
                                partiteVincitore += 1;
                                user.getModel().findOneAndUpdate({"_id": req.user.id},{"partiteVinte":partiteVincitore}).exec();
                                let loser;
                                if(returnmatch.owner == req.user.id){
                                    loser = returnmatch.opponent;
                                }
                                else{
                                    loser = returnmatch.owner;
                                }
                                let partitePerse;
                                    user.getModel().findOne({"_id": loser}).then((defeated) => {
                                        // Aggiorno le informazioni dello sconfitto
                                        
                                        //console.log("ha perso : " + defeated.username)
                                        partitePerse = defeated.partitePerse;
                                        partitePerse += 1;
                                        user.getModel().findOneAndUpdate({"_id": defeated._id},{"partitePerse": partitePerse}).exec();
                                    })
                                //console.log("ha vinto il player " + req.user.id)
                                //console.log(userret.username)
                                return res.status(200).json({ error: false, errormessage: "", message: "ha vinto il player " + userret.username/*returnmatch.lastIdAttacker*/, winner: userret.username })
                            })
                        })
                    }
                    else
                        return res.status(200).json({ error: false, errormessage: "", message: "Cella colpita correttamente", attacker: req.user.id })},
                (error) => { throw error});
                
            }
        },
        (error) =>{ throw error;});
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
        user.getModel().findOne({ "username": "admin" }).count().then(
            (data) => {
                //console.log(data);
                if (data == 0) {
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
                    admin.setPassword("admin");
                    admin.save().then(() => {
                        console.log("Admin created");
                    }).catch((err) => {
                        console.log("Unable to create admin user: " + err);
                    });
                }
            }
        )

        //Starting server
        let server = http.createServer(app);
        ios = io(server);
        ios.on('connection', function (client) {
            console.log("Socket.io client connected".green);
            client.on('disconnect', function () {
                console.log('user disconnected'.magenta);
            });
        });
        // Intialize model
        user.getModel();
        match.getModel();
        field.getModel();
        chat.getModel();
        message.getModel();
        server.listen(8080, () => console.log("HTTP Server started on port 8080"));

    },
    function onrejected() {
        console.log("Unable to connect to MongoDB");
        process.exit(-2);
    }
)