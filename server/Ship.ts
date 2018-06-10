
import mongoose = require('mongoose');

/**
 * Classe per la rappresentazione di una nave.
 * 
 * La proprietà cells contiene un array delle posizioni delle celle della nave.
 */
export class Ship {

    cells : Array<Object>;

    /**
     * Costruttore della classe.
     * @param positions array delle posizioni della nave nel formato {x: Number, y: Number}
     */
    constructor(positions : Array<Object>) {
        this.cells = new Array<Object> ();
        positions.forEach(position => {
            let hit
            if( !(position['hit'] === undefined)){
                hit = position['hit'];
            } else{
                hit = false;
            }
            this.cells.push({ x : position["x"], y : position["y"], hit : hit});
        })
    }

    /**
     * Metodo per verificare se una delle celle della nave sia stata colpita da un colpo in posizione position.
     * @param position posizione del colpo nel formato {x: Number, y: Number}
     */
    hit (position : any) : boolean {
        var hit = false;
        this.cells.forEach( cell => {
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

    /**
     * Metodo per verificare se una delle navi sia affondata o meno
     */
    isSunk() : boolean{
        var sunk = true;

        this.cells.forEach(cell =>{
            sunk = sunk && cell["hit"];
        })

        return sunk;
    }
}