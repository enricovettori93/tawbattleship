import mongoose = require('mongoose');
import crypto = require('crypto');

export interface User extends mongoose.Document{
    name: string,
    cognome: string,
    username: string,
    mail: string,
    partiteVinte: Number,
    partitePerse: Number,
    salt: string,
    digest: string,
    roles: string[],
    setPassword: (pwd:string)=>void,
    validatePassword: (pwd:string)=>boolean,
    hasAdminRole: ()=>boolean,
    setAdmin: ()=>void,
    hasModeratorRole: ()=>boolean,
    setModerator: ()=>void
}

var userSchema = new mongoose.Schema( {
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    mail: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    roles:  {
        type: [mongoose.SchemaTypes.String],
        required: true 
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
    for(var roleidx in this.roles) {
        if( this.roles[roleidx] === 'ADMIN' )
            return true;
    }
    return false;
}

userSchema.methods.setAdmin = function() {
    this.roles.push("ADMIN");
}

userSchema.methods.hasModeratorRole = function(): boolean {
    for(var roleidx in this.roles) {
        if(this.roles[roleidx] === 'MODERATOR')
            return true;
    }
    return false;
}

userSchema.methods.setModerator = function() {
    this.roles.push( "MODERATOR" );
}

export function getSchema() { return userSchema; }

var userModel;
export function getModel(): mongoose.Model<mongoose.Document> {
    if (!userModel) {
        userModel = mongoose.model('Ship', getSchema())
    }
    return userModel;
}
