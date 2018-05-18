import mongoose = require('mongoose');
import crypto = require('crypto');
import { ObjectID } from 'bson';
import { Chat } from './Chat';

export interface User extends mongoose.Document{
    name: string,
    surname: string,
    username: string,
    mail: string,
    partiteVinte: Number,
    partitePerse: Number,
    salt: string,
    digest: string,
    isAdmin: boolean,
    chatList: [Chat],
    setPassword: (pwd:string) => void,
    validatePassword: (pwd:string) => boolean,
    hasAdminRole: () => boolean,
    setAdmin: () => void,
}

var userSchema = new mongoose.Schema( {
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    surname: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    mail: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    isAdmin:  {
        type: mongoose.SchemaTypes.Boolean,
        required: true 
    },
    chatList:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Chat',
        required: false
    },
    salt:  {
        type: mongoose.SchemaTypes.String,
        required: false 
    },
    digest:  {
        type: mongoose.SchemaTypes.String,
        required: false 
    },
    partitePerse: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    partiteVinte: {
        type: mongoose.SchemaTypes.Number,
        required: false
    }
})

userSchema.methods.setPassword = function( pwd:string ) {
    this.salt = crypto.randomBytes(16).toString('hex');
    var hmac = crypto.createHmac('sha512', this.salt );
    hmac.update( pwd );
    this.digest = hmac.digest('hex');
}

userSchema.methods.validatePassword = function( pwd:string ):boolean {
    var hmac = crypto.createHmac('sha512', this.salt );
    hmac.update(pwd);
    var digest = hmac.digest('hex');
    return (this.digest === digest);
}

userSchema.methods.hasAdminRole = function(): boolean {
    return this.isAdmin;
}

userSchema.methods.setAdmin = function() {
    this.isAdmin = true;
}

export function getSchema() { return userSchema; }

var userModel;
export function getModel(): mongoose.Model<User> {
    if (!userModel) {
        userModel = mongoose.model('User', getSchema())
    }
    return userModel;
}

export function newUser(data): User {
    var _userModel = getModel();
    var user = new _userModel(data);
    return user;
}