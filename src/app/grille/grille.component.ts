import { Component, OnInit } from '@angular/core';
import {CaseComponent} from '../case/case.component.ts';
import {Input} from "@angular/core/src/metadata/directives";
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  @Input() nbrLignes : number;
  @Input() nbrColumns : number;
  @Input() nbrMines : number;

  largeur : number;

  seconde = 0;
  minute = 0;
  firstClick : boolean = true;

  champsMines = new Array<Array<CaseComponent>>();
  etatPartie : String = "";

  constructor(private contextMenuService: ContextMenuService){
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.etatPartie = "";
    this.champsMines = new Array<Array<CaseComponent>>();
    this.creerGrille(this.nbrLignes,this.nbrColumns,this.nbrMines);
  }

  public creerGrille(numLigne: number, numCol: number,nbrMine : number){
    let i;
    this.largeur = 24 * this.nbrLignes;
    for(i=0; i < numLigne ;i++){
      let ligne = new Array<CaseComponent>();
      for(let j=0 ; j < numCol ; j++){
        let _case : CaseComponent = new CaseComponent(this.contextMenuService);
        ligne.push(_case);
      }
      this.champsMines.push(ligne);
    }
    for(i = 0 ; i < nbrMine ; i++)
      this.placerMines();

    this.calculerNombre();
  }

  public placerMines() {
    let row : number;
    let col : number;
    let mine : CaseComponent;
    row = Math.round(Math.random()* (this.champsMines.length - 1) );
    col = Math.round(Math.random()*( this.champsMines[0].length - 1));
    this.champsMines[row][col].contenu = "mine";
  }

  public calculerNombre(){
    let i,j;
    for(i=0;i<this.champsMines.length ;i++){
      for(j=0;j<this.champsMines[i].length;j++) {
        this.champsMines[i][j] = this.doWork(this.champsMines[i][j],i,j);
      }
    }
  }
  public doWork(myCase : CaseComponent,row:number,column:number ) : CaseComponent{

    let maCase = this.champsMines[row][column];
    if(maCase.contenu == "mine"){
      return myCase;
    }
    let mineCount = 0;
    if(row > 0){
      if(column > 0){
        let maCase = this.champsMines[row - 1][column - 1];
        if(maCase.contenu == "mine")
          mineCount++;
      }
      let maCase = this.champsMines[row - 1][column];
      if(maCase.contenu == "mine") {
        mineCount++;
      }
      if(column < this.nbrColumns-1) {
        let maCase = this.champsMines[row - 1][column + 1];
        if(maCase.contenu == "mine") {
          mineCount++;
        }
      }
    }
    if(column > 0) {
      let maCase = this.champsMines[row][column - 1];
      if(maCase.contenu == "mine") {
        mineCount++;
      }
    }
    if(column < this.nbrColumns-1) {
      let maCase = this.champsMines[row][column + 1];
      if(maCase.contenu == "mine") {
        mineCount++;
      }
    }
    if(row < this.nbrLignes-1) {
      if(column > 0) {
        let maCase = this.champsMines[row + 1][column - 1];
        if(maCase.contenu == "mine") {
          mineCount++;
        }
      }
      let maCase = this.champsMines[row + 1][column];
      if(maCase.contenu == "mine") {
        mineCount++;
      }
      if(column < this.nbrColumns -1) {
        let maCase = this.champsMines[row + 1][column + 1];
        if(maCase.contenu == "mine") {
          mineCount++;
        }
      }
    }
    if(mineCount > 0) {
      myCase.contenu = mineCount.toString();
    }
    return myCase;
  }

  public showboard(_maCase : CaseComponent,row,column){
    if(this.firstClick == true ){
      this.startTimer();
      this.firstClick = false;
    }
    if( _maCase.contenuRightClicked == "covered"){
      if(this.etatPartie != "GAME OVER, Désolé, Vous avez perdu !" ){
        _maCase.isCachee = false;
        _maCase.visite = true;
        _maCase.setImage();
      }
      if(!this.aPerdu(_maCase)  && this.etatPartie != "GAME OVER, Désolé, Vous avez perdu !")
        if (_maCase.contenu != "mine" && _maCase.contenu == "vide" ) {
          if (row > 0) {
            if (column > 0) {
              let maCase = this.champsMines[row - 1][column - 1];
              if (maCase.contenu != "mine") {
                if (row - 1 >= 0 && column - 1 >= 0 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                  this.showboard(maCase, row - 1, column - 1);
                }
                else if (row - 1 >= 0 && column - 1 >= 0 && !maCase.visite && maCase.contenuRightClicked != "?") {
                  maCase.visite = true;
                  maCase.isCachee = false;
                  maCase.setImage();
                }
              }
            }
            let maCase = this.champsMines[row - 1][column];
            if (maCase.contenu != "mine") {
              if (row - 1 >= 0 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                this.showboard(maCase, row - 1, column);
              }
              else if (row - 1 >= 0 && !maCase.visite && maCase.contenuRightClicked != "?") {
                maCase.visite = true;
                maCase.isCachee = false;
                maCase.setImage();
              }
            }
            if (column < this.nbrColumns - 1) {
              let maCase = this.champsMines[row - 1][column + 1];
              if (maCase.contenu != "mine") {
                if (row - 1 >= 0 && column + 1 <= this.nbrColumns - 1 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                  this.showboard(maCase, row - 1, column + 1);
                }
                else if (row - 1 >= 0 && column + 1 <= this.nbrColumns - 1 && !maCase.visite && maCase.contenuRightClicked != "?") {
                  maCase.visite = true;
                  maCase.isCachee = false;
                  maCase.setImage();
                }
              }
            }
          }
          if (row < this.nbrLignes - 1) {
            if (column > 0) {
              let maCase = this.champsMines[row + 1][column - 1];
              if (maCase.contenu != "mine") {
                if (row + 1 <= this.nbrLignes - 1 && column - 1 >= 0 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                  this.showboard(maCase, row + 1, column - 1);
                }
                else if (row + 1 <= this.nbrLignes - 1 && column - 1 >= 0 && !maCase.visite && maCase.contenuRightClicked != "?") {
                  maCase.visite = true;
                  maCase.isCachee = false;
                  maCase.setImage();
                }
              }
            }

            let maCase = this.champsMines[row + 1][column];
            if (maCase.contenu != "mine") {
              if (row + 1 <= this.nbrLignes - 1 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                this.showboard(maCase, row + 1, column);
              }
              else if (row + 1 <= this.nbrLignes - 1 && !maCase.visite && maCase.contenuRightClicked != "?") {
                maCase.visite = true;
                maCase.isCachee = false;
                maCase.setImage();
              }
            }
            if (column < this.nbrColumns - 1) {
              let maCase = this.champsMines[row + 1][column + 1];
              if (maCase.contenu != "mine") {
                if (row + 1 <= this.nbrLignes - 1 && column + 1 <= this.nbrColumns - 1 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                  this.showboard(maCase, row + 1, column + 1)
                }
                else if (row + 1 <= this.nbrLignes - 1 && column + 1 <= this.nbrColumns - 1 && !maCase.visite && maCase.contenuRightClicked != "?") {
                  maCase.visite = true;
                  maCase.isCachee = false;
                  maCase.setImage();
                }
              }
            }
          }
          if (column > 0) {
            let maCase = this.champsMines[row][column - 1];
            if (maCase.contenu != "mine") {
              if (column - 1 >= 0 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                this.showboard(maCase, row, column - 1);
              }
              else if (column - 1 >= 0 && !maCase.visite && maCase.contenuRightClicked != "?") {
                maCase.visite = true;
                maCase.isCachee = false;
                maCase.setImage();
              }
            }
          }
          if (column < this.nbrColumns - 1) {
            let maCase = this.champsMines[row][column + 1];
            if (maCase.contenu != "mine") {
              if (column + 1 <= this.nbrLignes - 1 && maCase.contenu == "vide" && !maCase.visite && maCase.contenuRightClicked != "?") {
                this.showboard(maCase, row, column + 1);
              }
              else if (column + 1 <= this.nbrLignes - 1 && !maCase.visite && maCase.contenuRightClicked != "?") {
                maCase.visite = true;
                maCase.isCachee = false;
                maCase.setImage();
              }
            }
          }
        }
    }

    if(this.aGagne()) {
      for(let i=0; i < this.nbrLignes ;i++){
        for(let j=0; j < this.nbrColumns ;j++){
          if(this.champsMines[i][j].contenu == "mine"){
            this.champsMines[i][j].urlImage = "./assets/images/mine.png";
          }
        }
      }
    }
  }

  public startTimer(){
    let mySeconde = Observable.timer(0,1000);
    mySeconde.subscribe(t => this.tickerFunc2(t));

    let myMinute = Observable.timer(0,60000);
    myMinute.subscribe(t => this.tickerFunc1(t));
  }

  tickerFunc1(tick){
    this.minute = tick % 60;
  }
  tickerFunc2(tick){
    this.seconde = tick % 60;
  }

  public aPerdu(maCase : CaseComponent) : boolean {
    let aperdu : boolean = false;
    if(maCase.contenu == "mine"){
      this.etatPartie = "GAME OVER, Désolé, Vous avez perdu !";
      for(let i=0; i < this.nbrLignes ;i++){
        for(let j=0; j < this.nbrColumns ;j++){
          if(this.champsMines[i][j].contenuRightClicked == "covered"){
            if(this.champsMines[i][j].contenu == "mine"){
              this.champsMines[i][j].urlImage = "./assets/images/mine-wrong.png";
            }
          }
          else {
            if(this.champsMines[i][j].contenu == "mine")
              this.champsMines[i][j].urlImage = "./assets/images/mine-wrong.png";
            else{
              this.champsMines[i][j].urlImage = "./assets/images/flag-mine-wrong.png";
            }

          }
        }
      }
      return aperdu = true;
    }
    return aperdu;
  }

  public aGagne() : boolean {
    let agagner :boolean = false;
    let i,j,nbrNonMineNonCachee,nbrMine,nbrMineCachee : number;
    nbrMine = 0;
    nbrNonMineNonCachee = 0;
    nbrMineCachee = 0;
    for(i=0; i < this.nbrLignes  ;i++){
      for(j=0; j < this.nbrColumns ;j++){
        if (this.champsMines[i][j].contenu == "mine" ){
          nbrMine++;
        }
        if(this.champsMines[i][j].isCachee == true && this.champsMines[i][j].contenu == "mine" ){
          nbrMineCachee++;
        }
        if(this.champsMines[i][j].isCachee == false && this.champsMines[i][j].contenu != "mine" ){
          nbrNonMineNonCachee++;
        }
      }
    }
    if( nbrMineCachee == nbrMine &&  (nbrNonMineNonCachee == (this.nbrLignes*this.nbrColumns)-nbrMine)){
      agagner = true;
      let monMessage = "Felicitation, vous avez gagné, score = "+this.minute+":"+this.seconde;
      this.etatPartie = monMessage;
    }
    return agagner;
  }
}
