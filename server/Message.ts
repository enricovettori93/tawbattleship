import mongoose = require("mongoose");
import { Timestamp } from "bson";

export interface Message extends mongoose.Document{
    idChat: string,
    sentAt: Date,
    senderID: string,
    text: string
}

var messageSchema = new mongoose.Schema({
    idChat:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chat',
        required: true
    },
    sentAt:{
        type: Date,
        required: true
    },
    senderID:{
        type: mongoose.SchemaTypes.ObjectId,
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