import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-view',
  templateUrl: './clock-view.component.html',
  styleUrls: ['./clock-view.component.scss']
})
export class ClockViewComponent implements OnInit {

  clockConfig = {
    hour: [{ id: 'hourClock', num: 0 }, { id: 'hourClock2', num: 0 }],
    minute: [{ id: 'minuteClock', num: 0 }, { id: 'minuteClock2', num: 0 }],
    second: [{ id: 'secondClock', num: 0 }, { id: 'secondClock2', num: 0 }],

  };
  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      this.setTime(new Date());
    }, 1000);
  }

  setTime(date: Date) {
    const hour = date.getHours();
    this.clockConfig.hour[0].num = parseInt((hour / 10) + '', 0);
    this.clockConfig.hour[1].num = hour - this.clockConfig.hour[0].num * 10;
    const minute = date.getMinutes();
    this.clockConfig.minute[0].num = parseInt((minute / 10) + '', 0);
    this.clockConfig.minute[1].num = minute - this.clockConfig.minute[0].num * 10;

    const second = date.getSeconds();
    this.clockConfig.second[0].num = parseInt((second / 10) + '', 0);
    this.clockConfig.second[1].num = second - this.clockConfig.second[0].num * 10;
    console.log(JSON.stringify(this.clockConfig));
  }
}
