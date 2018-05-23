
import mongoose = require('mongoose');

export class Point{
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
}
