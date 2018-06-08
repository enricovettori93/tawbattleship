import mongoose = require('mongoose');

import { Ship } from './Ship';
import { ObjectId } from 'bson';

export interface Field extends mongoose.Document{
    playerId: ObjectId,
    matrix: string[][],
    aliveShips : Number,
    ships : Ship[],
    shoot: (position : any) => void,
    insertShips: (jFile : any) => void
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    }, 
    matrix : [[{
        type : mongoose.SchemaTypes.String,
        required : true
    }]], 

    aliveShips: {
        type : mongoose.SchemaTypes.Number,
        required : false
    },

    ships: {
        type : mongoose.SchemaTypes.Array,
        required : false
    }
})

export function getSchema(){ return FieldSchema; }


// Mongoose Model
var fieldModel;
export function getModel(): mongoose.Model<Field> { // Return Model as singleton
    if (!fieldModel) {
        fieldModel = mongoose.model('Field', getSchema())
    }
    return fieldModel;
}
//colori delle celle, temporanei (da modificare a seconda dell'estetica)

export enum cellColor {
    unknown = "#00ffff", //azzurro chiaro
    water = "#000080", //blu scuro
    hit = "#ff0000", //rosso
    shipDestroyed = "#00ff00", //verde lime
    ship = "#000000"
}



export function newField(UID : string, jFile : any) : Field {
    var _fieldModel = getModel();
    var field = new _fieldModel();
    field.playerId = mongoose.Types.ObjectId(UID);
    field.matrix = new Array<Array<string>>(10);
    for(var i = 0; i<=9; i++){
        for(var j = 0; j<=9; j++){
            field.matrix[i][j] = cellColor.unknown;
        }
    }
    field.ships = new Array <Ship>();
    field.aliveShips = 0;
    field.insertShips(jFile);
    return field;
}

function checkSubsequent( nave : any) : boolean{

    var isSub = true;
    for(var i = 1; i <= nave.length-1; i++){
        isSub = isSub && ((nave[i-1].x == (nave[i].x)-1) || (nave[i-1].y == (nave[i].y)-1));
    }

    return isSub;
}


FieldSchema.methods.shoot = function ( position : any) {
    if (this.matrix[position.x][position.y] == cellColor.unknown){
        var hit = false;
        this.ships.forEach( (ship, index) => {
            var ship1 = new Ship(ship[0].cells);
            if (ship1.hit(position)){
                hit = true;
                if (ship1.isSunk()){ 
                    this.aliveShips = this.aliveShips -1;
                    ship1.cells.forEach(cell => {
                        this.matrix[cell["x"]][cell["y"]] = cellColor.shipDestroyed;
                    })
                }
                else{
                    this.matrix[position.x][position.y] = cellColor.hit;
                }
            }
            this.ships[index] = ship1;
        })
        if(!hit){
            this.matrix[position.x][position.y] = cellColor.water;
        }
        //console.log(this.ships);
        //console.log(this.matrix);
        getModel().findOneAndUpdate({"_id" : this._id}, {"matrix" : this.matrix, "ships" : this.ships}).then((field) =>{
            console.log("Field saved successfully : " + field._id);
        }).catch((error) => {
            console.log("Unable to save the field : " + error);
            })
    }
    
        throw "cella già controllata!"
}

FieldSchema.methods.insertShips = function (jFile : any) {

    var navi = {}
    navi[2] = {'quantity' : 4, 'actualQuantity' : 0};
    navi[3] = {'quantity' : 2, 'actualQuantity' : 0};
    navi[4] = {'quantity' : 2, 'actualQuantity' : 0};
    navi[5] = {'quantity' : 1, 'actualQuantity' : 0};
    //console.log(typeof this.ships);
    jFile["ships"].forEach(element => {
        
        if (element.length > 5 || element.length < 2) {
            this.matrix = this.ships = [];
            this.aliveShips = 0;
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

