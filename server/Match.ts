
import mongoose = require('mongoose');
//import { newField } from './Field';
import { Field } from './Field';
import * as field from './Field';
enum MatchStatus {
    Wait,
    Active,
    Ended
}

export interface Match extends mongoose.Document {
    timestamp: Date,
    player1Id: Number,
    player2Id: Number,
    fieldPlayer1: Field,
    fieldPlayer2: Field,
    status: MatchStatus,
    winnerId: Number
}

// We use Mongoose to perform the ODM between our application and
// mongodb. To do that we need to create a Schema and an associated
// data model that will be mapped into a mongodb collection
//
// Type checking cannot be enforced at runtime so we must take care
// of correctly matching the Message interface with the messageSchema 
//
// Mongoose Schema
var MatchSchema = new mongoose.Schema({
    timestamp: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    player1Id: { //per ora diamo per scontato che sia l'owner
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    player2Id: {
        type: mongoose.SchemaTypes.Number
    },

    fieldPlayer1: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Field"
    },
    fieldPlayer2: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Field"
    },
    status: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    winnerId: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },


})

MatchSchema.methods.getStatus = function () : Number {
    return this.status;
}

MatchSchema.methods.getWinnerId = function () : Number{
    if (this.status == MatchStatus.Wait || this.status == MatchStatus.Active)
        return null;
    else
        return this.winnderId;
}

MatchSchema.methods.setStatus = function(status : MatchStatus) {
    this.status = status;
}


export function getSchema() { return MatchSchema; }

// Mongoose Model
var matchModel; 
export function getModel(): mongoose.Model<Match> { // Return Model as singleton
    if (!matchModel) {
        matchModel = mongoose.model('Match', getSchema())
    }
    return matchModel;
}

export function newMatch(owner : Number) : Match{
    var _matchModel = getModel();
    var match = new _matchModel();

    // inizializzo la data della partita
    match.timestamp = new Date()

    // inizializzo i due ID proprietari della partita
    match.player1Id = owner

    // inizializzo il campo di owner
    match.fieldPlayer1 = field.newField(owner)

    // setto lo status del match come Wait, in attesa del secondo player
    match.setStatus(MatchStatus.Wait)

    return match
}