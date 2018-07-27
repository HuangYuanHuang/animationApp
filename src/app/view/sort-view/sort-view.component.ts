import { Component, OnInit } from '@angular/core';
import { SortFactoryService, SortPlayModel } from '../../service/sort-factory.service';
import { SortTypeEnum } from '../../service/sort-core/i-sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort-view',
  templateUrl: './sort-view.component.html',
  styleUrls: ['./sort-view.component.scss']
})
export class SortViewComponent implements OnInit {
  animation = 100;
  sortNodes = [1, 5, 3, 6, 9, 5, 17, 15, 6, 5, 11, 14, 1, 14, 16];
  updateBtn = false;
  playBtn = false;
  sortType = 'bubble';
  coreImage = '';
  constructor(private sortFactory: SortFactoryService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  changeArr() {
    const arr = [];
    let len = 1;
    while (len <= 15) {
      const temp = Math.random() * 20;
      const tempInt = parseInt(temp + '', 0);
      if (tempInt >= 1 && tempInt <= 19) {
        len++;
        arr.push(tempInt);
      }
    }
    this.sortNodes = arr;
  }
  play() {
    this.updateBtn = true;
    this.playBtn = true;
    let sortEnum = SortTypeEnum.BubbleSort;
    if (this.sortType === 'select') {
      sortEnum = SortTypeEnum.SelectSort;
    }
    this.sortFactory.subjectPlay.next(new SortPlayModel(this.sortNodes, sortEnum));
  }
  showCore(content) {
    this.coreImage = `/assets/img/${this.sortType}.png`;
    this.modalService.open(content, { size: 'lg' });
  }
  sortFinishedEvent() {
    this.updateBtn = false;
    this.playBtn = false;
  }
}
