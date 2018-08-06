import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnimationModule } from '../animation/animation.module';
import { ClockViewComponent } from './clock-view/clock-view.component';
import { SortViewComponent } from './sort-view/sort-view.component';
import { HanoiViewComponent } from './hanoi-view/hanoi-view.component';

const routes: Routes = [
  { path: 'clock', component: ClockViewComponent },
  { path: 'sort', component: SortViewComponent },
  { path: 'hanoi', component: HanoiViewComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnimationModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    ClockViewComponent,
    SortViewComponent,
    HanoiViewComponent
  ]
})
export class ViewModule { }
