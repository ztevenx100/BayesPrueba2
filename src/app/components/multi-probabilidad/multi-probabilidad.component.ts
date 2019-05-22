import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-probabilidad',
  templateUrl: './multi-probabilidad.component.html',
  styleUrls: ['./multi-probabilidad.component.css']
})
export class MultiProbabilidadComponent implements OnInit {


  ntimes: number[] = [];
  nProbabilities: number = 0;
  visibleMultiPro:boolean = false;
  name: String[]= [];
  position: String;
  tName: Name;

  @Input() events: number[] = [];
  @Input() namePro: String[] = [];
  @Input() valorMultiPro: number;
  @Input() totalName: Name[] = [];

  constructor() {
    this.events = [];
  }

  numberEvents(n): any[] {
    this.ntimes = [];
    for (let i = 0; i < n; i++) this.ntimes.push(n);
    return this.ntimes;
  }

  changeVisibility(visibleMultiPro) {
    this.visibleMultiPro = !visibleMultiPro;
  }

  setEvents(valorMultiPro,nMultiProbabilities) {
    this.events[valorMultiPro]= nMultiProbabilities.value;
  }

  setPosition(i,j):number{
    this.position = i+""+j;
    return Number(this.position);
  }

  setName(name,i,j){
    this.tName = {id:i+""+j, name:name, positionN1:i, positionN2:j};
    this.totalName[this.setPosition(i,j)] = this.tName;
  }

  ngOnInit() {
  }

}

interface Name {
  id:String;
  positionN1:number;
  positionN2:number;
  name:String;

}