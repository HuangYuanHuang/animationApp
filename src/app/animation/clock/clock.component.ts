import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const zr = zrender.init(document.getElementById('main'));
    const circle = new zrender.Circle({
      shape: {
          cx: 150,
          cy: 50,
          r: 40
      },
      style: {
          fill: 'none',
          stroke: '#F00'
      }
  });
  zr.add(circle);
  }

}
