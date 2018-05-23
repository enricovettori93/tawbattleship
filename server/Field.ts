
import mongoose = require('mongoose');
import { StringifyOptions } from 'querystring';

export interface Field extends mongoose.Document{
    playerId: string,
    matrix: Number[][],
}

// We use Mongoose to perform the ODM between our application and
// mongodb. To do that we need to create a Schema and an associated
// data model that will be mapped into a mongodb collection
//
// Type checking cannot be enforced at runtime so we must take care
// of correctly matching the Message interface with the messageSchema 
//
// Mongoose Schema
var FieldSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.SchemaTypes.String,
        required: true
    }, 
    matrix: [[{
        type: Number,
        required: true
    }]]
})
export function getSchema() { return FieldSchema; }

// Mongoose Model
var fieldModel;
export function getModel(): mongoose.Model<Field> { // Return Model as singleton
    if (!fieldModel) {
        fieldModel = mongoose.model('Field', getSchema())
    }
    return fieldModel;
}

export function newField(UID : string) : Field {
    var _fieldModel = getModel();
    var field = new _fieldModel();
    field.playerId = UID;
    field.matrix = new Array<Array<Number>>(10);
    field.matrix.forEach(array => {
        array = new Array <Number>(10);
    })
    return field;
}