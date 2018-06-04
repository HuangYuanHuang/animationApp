import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimationModule } from './animation/animation.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(), AnimationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
