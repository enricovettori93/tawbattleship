
import mongoose = require('mongoose');


export class Ship {

    cells : Array<Object>;

    // in input array di posizioni nel formato {x: Number, y: Number}
    constructor(positions : Array<Object>) {
        positions.forEach(position => {
            var tmp = String(position["x"])+","+String(position["y"])
            this.cells.push({ pos : tmp, hit : false});
        })
    }

    // in input una posizione nel formato {x: Number, y: Number}
    hit (position : Object) : boolean {
        this.cells.forEach( cell => {
            var tmp = String(position["x"])+","+String(position["y"])
            if (cell["pos"] == tmp){
                cell["hit"] == true;
                return true;
            } 
        })
        return false;
    }

    isSunk() : boolean{
        var sunk = true;

        this.cells.forEach(cell =>{
            sunk = sunk && cell["hit"];
        })

        return sunk;
    }
}



/*export class Point{
    x: Number;
    y: Number;
    alreadyHit: Boolean;
    constructor(x: Number, y:Number) {
        this.x = x;
        this.y = y;
        this.alreadyHit = false;
    }
}

export interface Ship {
    posArray: [Point],
    sunk: Boolean
}

var PointSchema = new mongoose.Schema({
    posArray: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    matrix: {
        type: Boolean,
        required: true
    },
})
export function getSchema() { return PointSchema; }

// Mongoose Model

 * TODO delete if not used anymore
var shipModel;
export function getModel(): mongoose.Model<mongoose.Ship> { // Return Model as singleton
    if (!shipModel) {
        shipModel = mongoose.model('Ship', getSchema())
    }
    return shipModel;
}

export function newShip(positions : any) : Ship {

    var _shipModel = getModel();
    var ship = new _shipModel();

    ship.sunk = false;

    positions.foreach(pos => {
        ship.posArray.push(new Point(pos.x, pos.y));
    })

    return ship;
}*/
