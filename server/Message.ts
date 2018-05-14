import mongoose = require("mongoose");
import { Timestamp } from "bson";

export interface Message extends mongoose.Document{
    sentAt: Date,
    senderUsername: string,
    text: string
}

var messageSchema = new mongoose.Schema({
    sentAt:{
        type: Date,
        required: true
    },
    senderUsername:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    text:{
        type: mongoose.SchemaTypes.String,
        required: true
    }
})

export function getSchema(){return messageSchema};

var messageModel;
export function getModel(): mongoose.Model<Message>{
    if(!messageModel){
        messageModel = mongoose.model('Message', getSchema());
    }
    return messageModel;
}

export function newMessage(data): Message{
    var _messageModel = getModel();
    var message = new _messageModel(data);
    return message;
}