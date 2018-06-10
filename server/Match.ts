import mongoose = require('mongoose');
import { Field } from './Field';
import * as field from './Field';
import { ObjectId } from 'bson';

/**
 * I possibili status di un match:
 *  - Wait: il match è in attesa che l'opponent joini la partita
 *  - Building: il match è in fase di costruzione, entrambi i giocatori devono inserire le proprie navi
 *  - Active: il match è in corso
 *  - Ended: il match si è concluso con un vincitore ed uno sconfitto
 */
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

/**
 * Metodo getter: ritorna lo status del Match.
 */
MatchSchema.methods.getStatus = function (): MatchStatus {
    return this.status;
}

/**
 * Metodo getter: ritorna l'Id del giocatore vincitore.
 */
MatchSchema.methods.getWinnerId = function (): string {
    if (this.status == MatchStatus.Wait || this.status == MatchStatus.Active)
        return null;
    else
        return this.winnderId;
}

/**
 * Metodo setter: setta lo status di un match.
 * @param status lo status a cui deve essere settato il match
 */
MatchSchema.methods.setStatus = function (status: MatchStatus) {
    this.status = status;
}

/**
 * Metodo per l'inserimento nel campo delle navi posizionate da un giocatore.
 * @param owner il proprietario del campo
 * @param shipJSON un documento in formato JSON contenente le navi e le posizioni delle loro celle.
 *                 Il file deve avere questa struttura: { "positioning" : { "ships" : [ [{"x" : 1, "y" : 1}, {"x" : 2, "y" : 1}], ...]}}
 */
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

/**
 * Funzione per la creazione di un match.
 * @param owner contiene l'ID del creatore del match
 */
export function newMatch(owner: string): Match {
    var _matchModel = getModel();
    var match = new _matchModel();

    // inizializzo la data della partita
    match.timestamp = new Date()

    // inizializzo l'ID proprietario della partita
    match.owner = mongoose.Types.ObjectId(owner);

    // setto lo status del match come Wait, in attesa del secondo player
    match.status = MatchStatus.Wait

    return match
}
