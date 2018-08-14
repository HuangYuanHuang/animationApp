import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() updateProgerss = new EventEmitter<number>();
  seconds = 0;
  constructor() { }
  ngOnInit() {


  }

  start(num: number, seconds: number) {
    this.data = [];
    this.maxNum = num;
    this.seconds = seconds;
    const game = new HanoiScene('renderCanvas');
    const hanoiA = new HanoiBottom(game, this.maxNum, 'HanoiA', new BABYLON.Vector3(-10, -5, 0), seconds);
    const hanoiB = new HanoiBottom(game, this.maxNum, 'HanoiB', new BABYLON.Vector3(-10, -5, 15), seconds);
    const hanoiC = new HanoiBottom(game, this.maxNum, 'HanoiC', new BABYLON.Vector3(-15, -5, 30), seconds);

    hanoiA.buildHanoiHeight(this.maxNum);
    game.doRender();
    this.hanoiCore(this.maxNum, hanoiA, hanoiB, hanoiC);
    console.log(this.data.length);
    this.playAnim(0, this.data.length);
  }

  private playAnim(index: number, len: number) {
    if (index < len) {
      setTimeout(() => {
        const data = this.data[index];
        data.from.Move(data.value, data.to);
        if (this.updateProgerss) {
          this.updateProgerss.emit((index + 1) * 100 / len);
        }
        this.playAnim(index + 1, len);
      }, this.seconds * 10);
    } else {
      this.updateProgerss.emit(100);
    }
  }

  private hanoiCore(index: number, A: HanoiBottom, B: HanoiBottom, C: HanoiBottom) {
    if (index === 1) {
      this.data.push({ from: A, value: index, to: C });
      return;
    }
    this.hanoiCore(index - 1, A, C, B);
    this.data.push({ from: A, value: index, to: C });
    this.hanoiCore(index - 1, B, A, C);
  }

}

