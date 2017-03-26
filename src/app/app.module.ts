import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './games/game.component';
import { MusicComponent } from './music/music.component';
//import { DataService } from './services/data.service';
//import { PagerService } from './services/pager.service';
import { WindowService } from './services/window.service';

const routing = RouterModule.forRoot([
    { path: '',      component: MusicComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    MusicComponent
  ],
  imports: [
    BrowserModule,
  /*FormsModule,
    ReactiveFormsModule,
    HttpModule,*/
    routing
  ],
  providers: [
  /*DataService,
    PagerService,*/
    WindowService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
