import mongoose = require("mongoose");
import { Timestamp, ObjectID } from "bson";
import { Message } from "./Message";

export interface Chat extends mongoose.Document{
    user1ID: Number,
    user2ID: Number,
    createdAt: Date,
    listMessage: [Message]
}

var chatSchema = new mongoose.Schema({
    user1ID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    user2ID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    listMessage:{
        type: [mongoose.SchemaTypes.ObjectId],
        required: true
    }
})

//Chat between user1 and user2 -> singleton
chatSchema.index({user1ID: 1, user2ID: 2},{unique: true});

export function getSchema(){return chatSchema}

var chatModel;

export function getModel(): mongoose.Model<Chat>{
    if(!chatModel){
        chatModel = mongoose.model('Chat',getSchema());
    }
    return chatModel;
}

export function newChat(data): Chat{
    var _chatModel = getModel();
    var chat = new _chatModel(data);
    return chat;
}