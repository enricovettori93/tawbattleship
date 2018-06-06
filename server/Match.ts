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
    lastIdAttacker: string,
    setStatus: (status: MatchStatus) => void,
    getStatus: () => MatchStatus,
    getWinnerId: () => string,
    insertField: (owner: string, shipJSON: any) => void
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    lastIdAttacker: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
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

MatchSchema.methods.insertField = function (owner: string, shipJSON: any): void {
    var field1 = field.newField(owner);
    try {
        field1.insertShips(shipJSON)
        field1.save().then(
            (success) => {
                let toRemove: Field;
                if (this.owner == owner) {
                    toRemove = this.fieldOwner;
                    this.fieldOwner = field1;
                } else {
                    toRemove = this.fieldOpponent;
                    this.fieldOpponent = field1;
                }
                if(toRemove !== null && toRemove !== undefined){
                    field.getModel().remove({"_id": toRemove}).then(
                        (success)=>{
                        }),
                        (error) =>{
                            console.log("Old field removed");
                            console.log("Error: " + error);
                        }
                }
            },
            (error) => {
            });
                throw ("Invalid field: " + error);

    } catch (y) {
        throw ("Invalid field: " + y);
    }
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
    // setto lo status del match come Wait, in attesa del secondo player
    match.status = MatchStatus.Wait

    return match
}
