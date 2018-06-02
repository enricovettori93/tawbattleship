import mongoose = require('mongoose');
import { StringifyOptions } from 'querystring';
//import { newShip } from './Ship';

export interface Field extends mongoose.Document{
    playerId: string,
    matrix: string[][]
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
    playerId : {
        type : mongoose.SchemaTypes.String,
        required : true
    }, 
    matrix : [[{
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    }]], 

    aliveShips: {
        type : mongoose.SchemaTypes.Number,
        required : false
    },

    ships: {
        type : [mongoose.SchemaTypes.Object],
        required : false
    }
})

export function getSchema() { return FieldSchema; }

//colori delle celle, temporanei (da modificare a seconda dell'estetica)

enum cellColor {
    unknown = "#00ffff", //azzurro chiaro
    water = "#000080", //blu scuro
    hit = "#ff0000", //rosso
    shipDestroyed = "#00ff00" //verde lime
}


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
    field.matrix = new Array<Array<string>>(10);
    field.matrix.forEach(array => {
        array = new Array <string>(10);
        array.forEach(cell => {
            cell = cellColor.unknown;
        })
    })
    return field;
}

function checkSubsequent( nave : any) : boolean{

    var isSub = true;
    var prev = nave[0];
    for(var i = 1; i <= nave.length-1; i++){
        isSub = isSub && ((prev.x == (nave[i].x)-1) || (prev.y == (nave[i].y)-1));
    }

    return isSub;
}

FieldSchema.methods.insertShips = function (jFile : any) {

    var navi = {}
    navi[2] = {'quantity' : 4, 'actualQuantity' : 0};
    navi[3] = {'quantity' : 2, 'actualQuantity' : 0};
    navi[4] = {'quantity' : 2, 'actualQuantity' : 0};
    navi[5] = {'quantity' : 1, 'actualQuantity' : 0};
    jFile.ships.foreach(element => {
        
        if (element.length > 5 || element.length < 2) {
            this.matrix = this.ships = [];
            this.aliveShips;
            throw "nave di dimensione errata"
        }

        if (navi[element.length].quantity == navi[element.length].actualQuantity){
            this.matrix = this.ships = [];
            this.aliveShips = 0;
            throw "troppe navi dello stesso tipo"
        }

        if (checkSubsequent(element)){
            navi[element.length].actualQuantity = navi[element.length].actualQuantity + 1;
            
            //crea una nuova nave
            this.ships.push(new Ship(element));
            this.aliveShips = this.aliveShips + 1;

        }
        else{
            this.matrix = this.ships = [];
            this.aliveShips = 0;
            throw "non sono successive le posizioni inserite"
        }
        
    });

    return true;
}

