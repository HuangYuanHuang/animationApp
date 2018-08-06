import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  navNodes = [
    { title: '首页', link: '/', active: 'active' },
    { title: '数字时钟', link: 'clock', active: '' },
    { title: '排序动画', link: 'sort', active: '' },
    { title: '3D汉诺塔', link: 'hanoi', active: '' }
  ];
  constructor(private router: Router) {

  }

  openLink(node: any) {
    this.navNodes.forEach(d => d.active = '');
    node.active = 'active';
    this.router.navigateByUrl(node.link);
  }
}
