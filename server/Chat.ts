import mongoose = require("mongoose");
import { Message } from "./Message";

export interface Chat extends mongoose.Document{
    user1ID: string,
    user2ID: string,
    createdAt: Date,
    listMessage: [Message]
}

var chatSchema = new mongoose.Schema({
    user1ID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    user2ID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    listMessage:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Message',
        required: true
    }]
})//.index({user1ID: 1, user2ID: 1},{unique: true});

//Chat between user1 and user2 -> singleton
chatSchema.index({"user1ID": 1, "user2ID": 1},{unique: true});


//Remove all messagges if chat is deleted
chatSchema.pre('remove', function(next) {
    this.model('Message').remove({ idChat: this._id }, next);
});

export function getSchema(){return chatSchema};

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