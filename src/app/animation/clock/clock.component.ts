import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  aag = [
    [0x18, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x18],
    [0x00, 0x18, 0x1c, 0x18, 0x18, 0x18, 0x18, 0x18],
    [0x00, 0x1e, 0x30, 0x30, 0x1c, 0x06, 0x06, 0x3e],
    [0x00, 0x1e, 0x30, 0x30, 0x1c, 0x30, 0x30, 0x1e],
    [0x00, 0x30, 0x38, 0x34, 0x32, 0x3e, 0x30, 0x30],
    [0x00, 0x1e, 0x02, 0x1e, 0x30, 0x30, 0x30, 0x1e],
    [0x00, 0x1c, 0x06, 0x1e, 0x36, 0x36, 0x36, 0x1c],
    [0x00, 0x3f, 0x30, 0x18, 0x18, 0x0c, 0x0c, 0x0c],
    [0x00, 0x1c, 0x36, 0x36, 0x1c, 0x36, 0x36, 0x1c],
    [0x00, 0x1c, 0x36, 0x36, 0x36, 0x3c, 0x30, 0x1c]
  ];
  constructor() {
  }
  clockNodes = [];
  ngOnInit() {
    const zr = zrender.init(document.getElementById('main'));
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        const node = new ClockNode(i, j);
        this.clockNodes.push(node);
        zr.add(node.circle);
      }
    }
    console.log(this.aag);
  }

}

class ClockNode {
  public xOffset = 100;
  public yOffset = 50;
  public shapeR = 40;
  public marginOffset = 5;
  public circle: any;
  public position = { x: 0, y: 0 };
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
        fill: 'none',
        stroke: '#F00'
      }
    });
  }
}
