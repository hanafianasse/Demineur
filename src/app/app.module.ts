import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import { AppComponent } from './app.component';
import { CaseComponent } from './case/case.component';
import { GrilleComponent } from './grille/grille.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    GrilleComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ContextMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
