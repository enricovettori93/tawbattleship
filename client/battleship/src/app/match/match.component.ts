import { Component, OnInit, ViewChild, ElementRef, Directive, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { UtilitiesService } from '../utilities.service';
import { MatchService } from '../match.service';
import { SocketioService } from '../socketio.service';
import { Router } from '@angular/router';
import * as PIXI from 'pixi.js/dist/pixi.js'; // @see https://github.com/pixijs/pixi.js/issues/4921
import { Sprite } from 'pixi.js';

// citation for icon: Battleship by Luke Anthony Firth from the Noun Project
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})


export class MatchComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasDom') canvasDom: ElementRef;
  private userName: string;
  private userMatches: string;
  private match;
  private id_match;

  canvas;

  constructor(
    private userService: UserService,
    private utilities: UtilitiesService,
    private matchService: MatchService,
    private socketIoService: SocketioService,
    private router: Router) { }

  ngOnInit() {
    this.utilities.check_auth(this.userService.get_token());
    this.id_match = (this.router.url.split('/'))[2];
    /** TODO with server and io socket
     * this.socketIoService.connect(this.id_match).subscribe((data) => {
    }
    );*/
    this.matchService.getSingleMatch(this.id_match).subscribe((match) => {
      this.match = match;
    }, (err) => {
      console.log(JSON.stringify(err));
    });

  }

  ngAfterViewInit() {
    console.log(this.canvasDom);
    this.createField();
  }
  // Ships initialization
  private shipInit() {
    const images: any = [];
    for (let i = 0; i < 4; i++) {
      const destroyer = PIXI.Sprite.fromImage('assets/images/destroyer.svg');
      destroyer.name = 'Cacciatorpediniere';
      destroyer.shipMaxNumber = 4;
      destroyer.dimension = 2;
      images.push(destroyer);
    }
    for (let i = 0; i < 3; i++) {
      const submarine = PIXI.Sprite.fromImage('assets/images/submarine.svg');
      submarine.name = 'Sottomarino';
      submarine.shipMaxNumber = 3;
      submarine.dimension = 3;
      images.push(submarine);
    }

    for (let i = 0; i < 2; i++) {
      const battleship = PIXI.Sprite.fromImage('assets/images/battleship.svg');
      battleship.name = 'Corazzata';
      battleship.shipMaxNumber = 2;
      battleship.dimension = 4;
      images.push(battleship);
    }


    const aircraft = PIXI.Sprite.fromImage('assets/images/aircraft-carrier.svg');
    aircraft.name = 'Portaerei';
    aircraft.shipMaxNumber = 1;
    aircraft.dimension = 5;
    images.push(aircraft);

    return images;
  }

  private createField() {
    const app = new PIXI.Application({ backgroundColor: 0xffffff });
    // create a new Sprite from an image path
    const images = this.shipInit();

    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 13,
      fontStyle: 'italic',
      fontWeight: 'bold'
    });

    let y = 50;
    const x = 50;
    const yInterval = app.screen.width / (images.length + 5);
    // overlaps sprite with same name
    let oldSpriteName = '';
    images.forEach(sprite => {
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.anchor.set(0.5);
      sprite.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
      if (oldSpriteName !== sprite.name) {
        const shipDescription = new PIXI.Text(`${sprite.name} x ${sprite.shipMaxNumber} - grandezza: ${sprite.dimension}`, fontStyle);
        y += yInterval;
        shipDescription.x = 0;
        shipDescription.y = y;
        app.stage.addChild(shipDescription);
      }
      sprite.y = y;
      sprite.x = x;
      oldSpriteName = sprite.name;
      app.stage.addChild(sprite);

    });
    this.canvasDom.nativeElement.appendChild(app.view);
    // Battlefield

    const container = new PIXI.Container();
    container.x = app.screen.width / 3;
    container.y = 0;
    app.stage.addChild(container);
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x444444, 1);
    for (let i = 0; i < 12; i++) {
      graphics.lineTo(app.screen.height / 11 * i, app.screen.width / 3 * 2);
      graphics.drawRect(0, app.screen.height / 11 * i, app.screen.width / 3 * 2, app.screen.height / 11);
    }
    console.log(graphics);
    container.addChild(graphics);

  }



}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}
