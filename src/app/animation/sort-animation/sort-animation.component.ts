import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SortFactoryService, SortPlayModel } from '../../service/sort-factory.service';
import { SortTypeEnum, ISortModel, SortUpdateModel, SortStateEnum } from '../../service/sort-core/i-sort';

@Component({
  selector: 'app-sort-animation',
  templateUrl: './sort-animation.component.html',
  styleUrls: ['./sort-animation.component.scss']
})
export class SortAnimationComponent implements OnInit, OnDestroy {
  @Output() sortFinishedEvent: EventEmitter<any> = new EventEmitter();
  @Input('animation') animation;
  zrender;
  sortNodes: ISortModel[];
  sortUpdateNodes: SortUpdateModel[];
  currentIndex = 0;
  currentLength = 0;
  compareNum = 0;
  exchangeNum = 0;
  initNodeSubscribe;
  updateNodeSubscribe;
  playNodeSubscribe;
  isFirst = true;
  constructor(private sorFactory: SortFactoryService) {
    // 初始化
    this.initNodeSubscribe = this.sorFactory.obInitNodes.subscribe((nodes: ISortModel[]) => {

      this.sortNodes = nodes;
      nodes.forEach((d: ISortModel) => {
        this.zrender.add(d.element);
      });
    });

    this.updateNodeSubscribe = this.sorFactory.obUpdateNodes.subscribe((nodes: SortUpdateModel[]) => {
      this.sortUpdateNodes = nodes;
      this.currentLength = nodes.length;
      this.updateDraw(nodes[0], 0, nodes.length - 1);


    });
    this.playNodeSubscribe = this.sorFactory.obPlayNode.subscribe((node: SortPlayModel) => {
      this.sortNodes = [];
      this.currentIndex = 0;
      this.currentLength = 0;
      $('div[class="progress"] div').removeAttr('style');
      this.compareNum = 0;
      this.exchangeNum = 0;
      // if (this.zrender) {
      //   this.zrender.dispose();
      // }
      this.zrender = zrender.init(document.getElementById('sortCanvas'));
      this.isFirst = false;
      this.sorFactory.Sort([...node.data], node.type);
    });
  }

  updateDraw(node: SortUpdateModel, index: number, maxLength: number) {
    this.currentIndex = index + 1;
    if (index > maxLength) {

      return;
    }
    setTimeout(() => {
      if (node.newState === SortStateEnum.Compare) {
        this.compareNum++;
      } else if (node.newState === SortStateEnum.Exchange) {
        this.exchangeNum++;
      }
      this.sortNodes[node.index].update(node.newValue, node.newState);
      if (index + 1 <= maxLength) {
        this.updateDraw(this.sortUpdateNodes[index + 1], index + 1, maxLength);
      } else {
        if (this.sortFinishedEvent) {
          this.sortFinishedEvent.emit('finished');
        }
      }

    }, this.animation);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.playNodeSubscribe.unsubscribe();
    this.updateNodeSubscribe.unsubscribe();
    this.initNodeSubscribe.unsubscribe();
  }
}
