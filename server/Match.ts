import mongoose = require('mongoose');
import { Field } from './Field';
import * as field from './Field';

export enum MatchStatus {
    Wait,
    Building,
    Active,
    Ended
}

export interface Match extends mongoose.Document {
    timestamp: Date,
    owner: string,
    opponent: string,
    fieldOwner: Field,
    fieldOpponent: Field,
    status: MatchStatus,
    winnerId: string,
    setStatus: (status: MatchStatus) => void,
    getStatus: () => MatchStatus,
    getWinnerId: () => string,
    insertField: (ownerId: string, shipJSON: any) => void
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
    owner: { //per ora diamo per scontato che sia l'owner
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    opponent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    fieldOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Field"
    },
    fieldOpponent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Field"
    },
    status: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    winnerId: {
        type: mongoose.SchemaTypes.ObjectId
    },
})

MatchSchema.methods.getStatus = function (): MatchStatus {
    return this.status;
}

MatchSchema.methods.getWinnerId = function (): string {
    if (this.status == MatchStatus.Wait || this.status == MatchStatus.Active)
        return null;
    else
        return this.winnderId;
}

MatchSchema.methods.setStatus = function (status: MatchStatus) {
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

export function newMatch(owner: string): Match {
    var _matchModel = getModel();
    var match = new _matchModel();

    // inizializzo la data della partita
    match.timestamp = new Date()
    // inizializzo i due ID proprietari della partita
    match.owner = owner
    // inizializzo il campo di owner
    match.fieldOwner = field.newField(owner)
    // setto lo status del match come Wait, in attesa del secondo player
    match.status = MatchStatus.Wait

    return match
}

export function insertField(owner: string, shipJSON: any): void {
    var field = field.newField();
    try {
        field.insertShip(shipJSON)
        if (this.owner == owner) {
            this.fieldOwner = field;
        }
        else {
            this.fieldOpponent = field;
        }
    } catch (y) {
        throw ("Invalid field");
    }
}