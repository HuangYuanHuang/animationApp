import { Component, OnInit } from '@angular/core';
import { HanoiScene } from './scene/hanoi-scene';
import { HanoiBottom } from './element/hanoi-bottom';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-hanoi',
  templateUrl: './hanoi.component.html',
  styleUrls: ['./hanoi.component.scss']
})
export class HanoiComponent implements OnInit {

  constructor() { }
  ngOnInit() {

    const game = new HanoiScene('renderCanvas');
    const hanoiA = new HanoiBottom(game, 10, 'HanoiA', new BABYLON.Vector3(-10, -5, 20));
    const hanoiB = new HanoiBottom(game, 10, 'HanoiA', new BABYLON.Vector3(0, -5, 35));
    const hanoiC = new HanoiBottom(game, 10, 'HanoiA', new BABYLON.Vector3(-15, -5, 0));

    hanoiA.buildHanoiHeight(10);
    game.doRender();

  }

}

