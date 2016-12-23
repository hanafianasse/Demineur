import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import { ContextMenuService } from 'angular2-contextmenu';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})

export class CaseComponent implements OnInit {

  @Input() me : CaseComponent;

  isCachee : boolean;
  urlImage : String;
  contenu : String;
  visite : boolean;
  contenuRightClicked : String;

  constructor(private contextMenuService: ContextMenuService) {
    this.isCachee = true;
    this.urlImage = "./assets/images/covered.png";
    this.contenu = "vide";
    this.visite = false;
    this.contenuRightClicked  = "covered";
  }

  ngOnInit() {

  }

  public onContextMenu($event: MouseEvent, item: any): void {

    this.contextMenuService.show.next({
      actions: [ ],
      event: $event,
      item: item,
    });
    $event.preventDefault();
    
    if(this.me.isCachee == true){

      if(this.me.contenuRightClicked == "covered"){
        this.me.urlImage = "./assets/images/flag-mine.png";
        this.me.contenuRightClicked = "?";
      }
      else if(this.me.contenuRightClicked == "flag-suspect"){
        this.me.urlImage = "./assets/images/covered.png";
        this.me.contenuRightClicked = "covered";
      }
      else if(this.me.contenuRightClicked == "?"){
        this.me.urlImage = "./assets/images/flag-suspect.png";
        this.me.contenuRightClicked = "flag-suspect";
      }
    }


  }

  public setImage(){
    this.me = this;
    if(this.me.contenu == "vide" )
      this.me.urlImage = "./assets/images/empty.png";

    if(this.me.contenu == "mine")
      this.me.urlImage = "./assets/images/mine-wrong.png";

    if(this.me.contenu == "1")
      this.me.urlImage = "./assets/images/number-1.png";
    if(this.me.contenu == "2")
      this.me.urlImage = "./assets/images/number-2.png";
    if(this.me.contenu == "3")
      this.me.urlImage = "./assets/images/number-3.png";
    if(this.me.contenu == "4")
      this.me.urlImage = "./assets/images/number-4.png";
    if(this.me.contenu == "5")
      this.me.urlImage = "./assets/images/number-5.png";
    if(this.me.contenu == "6")
      this.me.urlImage = "./assets/images/number-6.png";
    if(this.me.contenu == "7")
      this.me.urlImage = "./assets/images/number-7.png";
    if(this.me.contenu == "8")
      this.me.urlImage = "./assets/images/number-8.png";
  }
}
