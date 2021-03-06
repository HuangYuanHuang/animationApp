import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';
import { SortAnimationComponent } from './sort-animation/sort-animation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HanoiComponent } from './hanoi/hanoi.component';

@NgModule({
  imports: [
    CommonModule, NgbModule
  ],
  declarations: [ClockComponent, SortAnimationComponent, HanoiComponent],
  exports: [ClockComponent, SortAnimationComponent, HanoiComponent]
})
export class AnimationModule { }
