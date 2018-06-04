import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';
const routes: Routes = [
  { path: 'h5clock', component: ClockComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ClockComponent]
})
export class AnimationModule { }
