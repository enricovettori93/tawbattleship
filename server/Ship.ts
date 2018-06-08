
import mongoose = require('mongoose');


export class Ship {

    cells : Array<Object>;

    // in input array di posizioni nel formato {x: Number, y: Number}
    constructor(positions : Array<Object>) {
        this.cells = new Array<Object> ();
        positions.forEach(position => {
            //var tmp = String(position["x"])+","+String(position["y"])
            this.cells.push({ x : position["x"], y : position["y"], hit : false});
        })
    }

    // in input una posizione nel formato {x: Number, y: Number}
    hit (position : any) : boolean {
        var hit = false;
        this.cells.forEach( cell => {
            //var tmp = String(position["x"])+","+String(position["y"])
            //console.log("Posizione della cella: " + cell["x"] + ", " + cell["y"])
            //console.log("Posizione dello sparo: " + position["x"] + ", " + position["y"])
            if (cell["x"] == position["x"] && cell["y"] == position["y"]){
                //console.log("buongiorno")
                cell["hit"] = true;
                hit = true;
            } 
        })
        return hit;
    }

    isSunk() : boolean{
        var sunk = true;

        this.cells.forEach(cell =>{
            sunk = sunk && cell["hit"];
        })

        return sunk;
    }
}