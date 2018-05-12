import mongoose = require("mongoose");
import { Timestamp, ObjectID } from "bson";

export interface Chat extends mongoose.Document{
    usernameUser1: String,
    usernameUser2: String,
    createdAt: Timestamp,
    listMessage: [ObjectID]
}

var chatSchema = new mongoose.Schema({
    usernameUser1:{
        type: String,
        required: true
    },
    usernameUser2:{
        type: String,
        required: true
    },
    createdAt:{
        type: Timestamp,
        required: true
    },
    listMessage:{
        type: [ObjectID],
        required: true
    }
})

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