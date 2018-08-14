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

  maxNum = 10;
  data = [];
  constructor() { }
  ngOnInit() {

    const game = new HanoiScene('renderCanvas');
    const hanoiA = new HanoiBottom(game, this.maxNum, 'HanoiA', new BABYLON.Vector3(-10, -5, 0));
    const hanoiB = new HanoiBottom(game, this.maxNum, 'HanoiB', new BABYLON.Vector3(-10, -5, 15));
    const hanoiC = new HanoiBottom(game, this.maxNum, 'HanoiC', new BABYLON.Vector3(-15, -5, 30));

    hanoiA.buildHanoiHeight(this.maxNum);
    game.doRender();
    this.hanoiCore(this.maxNum, hanoiA, hanoiB, hanoiC);
    console.log(this.data.length);
    this.playAnim(0, this.data.length);
  }

  playAnim(index: number, len: number) {
    if (index < len) {
      setTimeout(() => {
        const data = this.data[index];
        data.from.Move(data.value, data.to);
        this.playAnim(index + 1, len);
      }, 200);
    }
  }

  hanoiCore(index: number, A: HanoiBottom, B: HanoiBottom, C: HanoiBottom) {
    if (index === 1) {
      this.data.push({ from: A, value: index, to: C });
      return;
    }
    this.hanoiCore(index - 1, A, C, B);
    this.data.push({ from: A, value: index, to: C });
    this.hanoiCore(index - 1, B, A, C);
  }

}

