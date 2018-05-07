
import mongoose = require('mongoose');

enum MatchStatus {
    Wait,
    Active,
    Ended
}

export interface Match {
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
    player1Id: {
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
export function getSchema() { return MatchSchema; }

// Mongoose Model
var matchModel; 
export function getModel(): mongoose.Model<mongoose.Document> { // Return Model as singleton
    if (!matchModel) {
        matchModel = mongoose.model('Match', getSchema())
    }
    return matchModel;
}