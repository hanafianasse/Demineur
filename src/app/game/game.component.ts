import {Component, OnInit} from '@angular/core';
import {GrilleComponent} from "../grille/grille.component";
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import {Observable} from "rxjs";

@Component({
  providers: [ ContextMenuService ],
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  board : GrilleComponent = new GrilleComponent(this.contextMenuService);

  mesLignes : number = 9;
  mesColumns : number = 9;
  mesMines : number = 10;



  constructor(private contextMenuService: ContextMenuService) {
    this.contextMenuService = new ContextMenuService();
  }

  ngOnInit() {
  }


  public nouvellePartie(row: HTMLInputElement,col: HTMLInputElement,mine : HTMLInputElement) {
    this.mesLignes = Number(row.value);
    this.mesColumns = Number(col.value);
    this.mesMines = Number(mine.value);
    row.value = "";
    col.value = "";
    mine.value = "";
  }
}
