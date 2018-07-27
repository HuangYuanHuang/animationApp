import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnChanges {
  mapData = [
    [0xC3, 0xBD, 0xBD, 0xBD, 0xBD, 0xBD, 0xBD, 0xC3],
    [0xEF, 0x8F, 0xEF, 0xEF, 0xEF, 0xEF, 0xEF, 0x01],
    [0xC3, 0xBD, 0xBD, 0xFB, 0xF7, 0xEF, 0xDF, 0x81],
    [0xC3, 0xBD, 0xFD, 0xE1, 0xE3, 0xFD, 0xBD, 0xC3],
    [0xF7, 0xE7, 0xD7, 0xB7, 0x77, 0x01, 0xF7, 0xF7],
    [0xC1, 0xDF, 0xDF, 0xC3, 0xFD, 0xFD, 0xBD, 0xC3],
    [0xC3, 0xBF, 0xBF, 0x83, 0xBD, 0xBD, 0xBD, 0xC3],
    [0x81, 0xBD, 0xFB, 0xF7, 0xEF, 0xEF, 0xEF, 0xEF],
    [0xC3, 0xBD, 0xBD, 0xC3, 0xC3, 0xBD, 0xBD, 0xC3],
    [0xC3, 0xBD, 0xBD, 0xBD, 0xC1, 0xFD, 0xFD, 0xC3]
  ];
  @Input('canvasId') canvasId;
  @Input('showNum') showNum;
  @ViewChild('main') el: ElementRef;
  private canvasHeight = '400px';
  clockNodes = [];
  currentNum = 0;
  isLoad = false;
  constructor(private render: Renderer2) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isLoad) {
      this.draw(changes['showNum'].currentValue);
    }

  }
  ngOnInit() {

    this.init();

  }
  init() {
    const div = this.render.createElement('div');
    this.render.setAttribute(div, 'id', this.canvasId);
    this.render.setStyle(div, 'height', this.canvasHeight);
    this.render.appendChild(this.el.nativeElement, div);
    const zr = zrender.init(document.getElementById(this.canvasId));
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        const node = new ClockNode(j, i);
        this.clockNodes.push(node);
        zr.add(node.circle);
      }
    }
    this.draw(0);
    this.isLoad = true;
  }
  draw(value: number) {
    this.clockNodes.forEach(d => d.updateDefault());
    const arr = this.mapData[value];
    for (let row = 0; row < 8; row++) {
      const bitArr = this.getBinray(arr[row]);
      for (let col = 0; col < 8; col++) {
        if (bitArr[col] !== 0) {
          this.clockNodes[row * 8 + col].updateActive();
        }
      }
    }
  }
  getBinray(value: number) {
    let res = value.toString(2);
    while (res.length < 8) {
      res = '0' + res;
    }
    const resArr = [];
    let index = 0;
    while (index < 8) {
      resArr.push(parseInt(res.substr(index, 1), 0));
      index++;
    }
    return resArr;
  }

}

class ClockNode {
  public xOffset = 0;
  public yOffset = 0;
  public shapeR = 5;
  public marginOffset = 0;
  public circle: any;
  public position = { x: 0, y: 0 };

  public isActive = false;
  constructor(public xIndex: number, public yIndex: number) {

    this.position.x = this.xOffset + (xIndex - 1) * this.marginOffset + this.shapeR + (xIndex - 1) * 2 * this.shapeR;
    this.position.y = this.yOffset + (yIndex - 1) * this.marginOffset + this.shapeR + (yIndex - 1) * 2 * this.shapeR;
    this.circle = new zrender.Circle({
      shape: {
        cx: this.position.x,
        cy: this.position.y,
        r: this.shapeR
      },
      style: {
        fill: 'black',
        stroke: 'white'
      }
    });
  }
  public updateDefault() {
    if (this.isActive) {
      this.circle.attr('style', { fill: 'black' });
    }
    this.isActive = false;
  }
  public updateActive() {
    this.circle.attr('style', { fill: 'none' });
    this.isActive = true;
  }
}
