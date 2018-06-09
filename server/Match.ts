import mongoose = require('mongoose');
import { Field } from './Field';
import * as field from './Field';
import { ObjectId } from 'bson';

export enum MatchStatus {
    Wait,
    Building,
    Active,
    Ended
}

export interface Match extends mongoose.Document {
    timestamp: Date,
    owner: ObjectId,
    opponent: ObjectId,
    fieldOwner: ObjectId,
    fieldOpponent: ObjectId,
    status: MatchStatus,
    winnerId: ObjectId,
    lastIdAttacker: ObjectId,
    setStatus: (status: MatchStatus) => void,
    getStatus: () => MatchStatus,
    getWinnerId: () => string,
    insertField: (owner: string, shipJSON: any) => Promise<any>
}


var MatchSchema = new mongoose.Schema({
    timestamp: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    opponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    fieldOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field"
    },
    fieldOpponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field"
    },
    status: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    winnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastIdAttacker:{
        type: mongoose.Schema.Types.ObjectId,
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

MatchSchema.methods.insertField = function (owner: string, shipJSON: any): Promise<any> {
    var promise = new Promise((resolve, reject) => {
        var field1 = field.newField(owner, shipJSON);
        
        field1.save().then(
            (field)=>{
                if(owner == this.owner.toString()){
                    this.set("fieldOwner", field._id);
                } else {
                    this.set("fieldOpponent", field._id);
                }
                if (this.fieldOwner !== undefined  && this.fieldOpponent !== undefined){
                    this.set("status", 2);
                }
                this.save(
                    (match) =>{
                        resolve(match);
                    },
                    (error) =>{
                        reject("Error during match saving: " + error);
                    }
                )
            },
            (error)=>{
                reject("Error during field saving: " + error);
            }
        );
    });
    return promise;

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
    match.owner = mongoose.Types.ObjectId(owner);
    // setto lo status del match come Wait, in attesa del secondo player
    match.status = MatchStatus.Wait

    return match
}
