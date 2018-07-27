import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SortBarModel } from './sort-core/Bar/SortBarModel';
import { SortTypeEnum, SortStateEnum, SortUpdateModel } from './sort-core/i-sort';
import { BubbleSort } from './sort-core/bubble-sort';
import { SelectSort } from './sort-core/select-sort';

@Injectable({
  providedIn: 'root'
})
export class SortFactoryService {

  private subjectInit = new Subject<any[]>();
  public subjectPlay = new Subject<SortPlayModel>();
  private subjectUpdate = new Subject<SortUpdateModel[]>();

  public obPlayNode;
  public obInitNodes;
  public obUpdateNodes;

  constructor() {
    this.obInitNodes = this.subjectInit.asObservable();
    this.obUpdateNodes = this.subjectUpdate.asObservable();
    this.obPlayNode = this.subjectPlay.asObservable();
  }
  Sort(arr: number[], type: SortTypeEnum) {
    switch (type) {
      case SortTypeEnum.BubbleSort:
        this.bulleSort(arr);
        break;
      case SortTypeEnum.SelectSort:
        this.selectSort(arr);
        break;
    }

  }

  private bulleSort(arr: number[]) {
    const barNodes = [];
    let index = 1;
    arr.forEach(d => {
      barNodes.push(new SortBarModel(d, index++, SortStateEnum.Default));
    });
    this.subjectInit.next(barNodes);

    const sortArr = new BubbleSort().Sort(arr);
    this.subjectUpdate.next(sortArr);
  }

  private selectSort(arr: number[]) {
    const barNodes = [];
    let index = 1;
    arr.forEach(d => {
      barNodes.push(new SortBarModel(d, index++, SortStateEnum.Default));
    });
    this.subjectInit.next(barNodes);

    const sortArr = new SelectSort().Sort(arr);
    this.subjectUpdate.next(sortArr);

  }
}

export class SortPlayModel {
  constructor(public data: any, public type: SortTypeEnum) {

  }
}
