import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AnimationModule } from '../animation/animation.module';
import { ClockViewComponent } from './clock-view/clock-view.component';

const routes: Routes = [
   { path: '', component: ClockViewComponent }
];
@NgModule({
  imports: [
    CommonModule,
    AnimationModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    ClockViewComponent
  ]
})
export class ViewModule { }
