import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-formularioBase",
  templateUrl: "./formularioBase.component.html",
  styleUrls: ["./formularioBase.component.css"]
})
export class FormularioBaseComponent implements OnInit {
  events: number[] = [];
  ntimes: number[] = [];
  nEvent: number = 0;
  ncol: number = 12;
  position: String;
  btnCalcular: boolean = false;
  formOptions: boolean = false;

  n: number[] = [];
  n1: number[] = [];
  padding: number[] = [];
  alto: number[] = [];
  namePro: String[] = [];
  probabilidad: number[] = [];
  j: number;

  totalName: Name[] = [];
  totalProbability: Probability[] = [];
  tProbability: Probability;
  name: String[] = [];
  options: Options[] = [];
  nOption: number;
  idOption: number = 0;

  constructor() {}

  numberEvents(n): any[] {
    this.ntimes = [];
    for (let i = 0; i < n; i++) {
      this.ntimes.push(n);
    }
    return this.ntimes;
  }

  addGraph(nEvents, events) {
    if (nEvents.value === 2) {
      this.ncol = 6;
    }
    if (nEvents.value === 3) {
      this.ncol = 4;
    }
    if (nEvents.value >= 4) {
      this.ncol = 3;
    }

    for (let i = 0; i < events.length; i++) {
      if (i === 0) {
        this.n[i] = events[i];
      } else {
        this.n[i] = events[i] * this.n[i - 1];
      }
    }

    for (let i = 0; i < events.length; i++) {
      if (i === 0) {
        this.n1[i] = 1;
      } else {
        this.n1[i] = events[i - 1] * this.n1[i - 1];
      }
    }

    for (let i = 0; i < events.length; i++) {
      this.padding[i] = this.n1[events.length - (i + 1)] - 1;
    }

    for (let j = 0; j < events.length; j++) {
      if (j === events.length - 1) {
        this.alto[j] = 1;
      } else {
        this.alto[j] = this.events[events.length - 1 - j];
      }
    }

    this.btnCalcular = true;

    return false;
  }

  setPosition(i, j): number {
    this.position = i + "" + j;
    return Number(this.position);
  }

  setProbability(name, i, j, probability) {
    this.tProbability = {
      id: i + "" + j,
      name: name,
      positionN1: i,
      positionN2: j,
      probability: probability.value
    };
    this.totalProbability[this.setPosition(i, j)] = this.tProbability;
  }

  getName() {
    this.j = 0;
    for (let i = 0; i < this.namePro.length; i++) {
      if (this.namePro[i] != null) {
        this.totalName[this.j].name = this.namePro[i];
        this.name[this.j] = this.namePro[i];
        this.j++;
      }
    }

    return this.name;
  }

  //Metodo para calcular las posibles opciones del calculo de bayes

  getOptions() {
    this.nOption = 0;
    var nTotal: String[] = [];
    var total: number[] = [];
    var t: number;

    for (let i = 0; i < this.totalName.length; i++) {
      if (this.totalName[i] !== null && this.totalName[i].positionN1 === 0) {
        for (let j = 0; j < this.totalName.length; j++) {
          if (this.totalName[j] !== null && this.totalName[j].positionN1 === 1) {
            this.options[this.nOption] = {
              id: "" + this.nOption + "",
              option:
                this.totalName[i].name +
                " / " +
                this.totalName[j].name +
                " (" +
                (i + 1) +
                ")",
              nProb1: this.totalName[i].name,
              prob1: 0,
              nProb2: this.totalName[j].name,
              prob2: 0,
              nprobParcial:
                this.totalName[i].name +
                " * " +
                this.totalName[j].name +
                " (" +
                (i + 1) +
                ")",
              probParcial: 0,
              nprobTotal: "",
              probTotal: 0,
              totalBayes: 0
            };
            this.nOption++;
          }
        }
      }
    }

    this.nOption = 0;

    for (let i = 0; i < this.totalProbability.length; i++) {
      if (
        this.totalProbability[i] !== null &&
        this.totalProbability[i].positionN1 === 0
      ) {
        for (let j = 0; j < this.totalProbability.length; j++) {
          if (
            this.totalProbability[j] != null &&
            this.totalProbability[j].positionN1 === 1 &&
            this.totalProbability[j].positionN2 < i * 2 + 2 &&
            this.totalProbability[j].positionN2 > i * 2 - 1
          ) {
            this.options[this.nOption] = {
              id: this.options[this.nOption].id,
              option: this.options[this.nOption].option,
              nProb1: this.options[this.nOption].nProb1,
              prob1: this.totalProbability[i].probability,
              nProb2: this.options[this.nOption].nProb2,
              prob2: this.totalProbability[j].probability,
              nprobParcial: this.options[this.nOption].nprobParcial,
              probParcial:
                this.totalProbability[i].probability *
                this.totalProbability[j].probability,
              nprobTotal: this.options[this.nOption].nprobTotal,
              probTotal: this.options[this.nOption].probTotal,
              totalBayes: this.options[this.nOption].totalBayes
            };
            this.nOption++;
          }
        }
      }
    }

    t = 0;
    for (let i = 0; i < this.events.length; i++) {
      nTotal[t] = "";
      for (let j = 0; j < this.options.length; j++) {
        if (Number(this.options[j].id) % this.events[1] === i) {
          nTotal[t] += this.options[j].nprobParcial + "";
          if (Number(this.options[j].id) + 2 < this.options.length)
            nTotal[t] += " + ";
        }
      }
      t++;
    }

    t = 0;
    for (let i = 0; i < this.events.length; i++) {
      total[t] = 0;
      for (let j = 0; j < this.options.length; j++) {
        if (Number(this.options[j].id) % this.events[1] === i) {
          total[t] += this.options[j].probParcial;
        }
      }
      t++;
    }

    for (let i = 0; i < this.events.length; i++) {
      for (let j = 0; j < this.options.length; j++) {
        if (
          Number(this.options[j].id) < i * this.events[1] + 2 &&
          Number(this.options[j].id) > i * this.events[1] - 1
        ) {
          this.options[j] = {
            id: this.options[j].id,
            option: this.options[j].option,
            nProb1: this.options[j].nProb1,
            prob1: this.options[j].prob1,
            nProb2: this.options[j].nProb2,
            prob2: this.options[j].prob2,
            nprobParcial: this.options[j].nprobParcial,
            probParcial: this.options[j].probParcial,
            nprobTotal: nTotal[i],
            probTotal: total[i],
            totalBayes: this.options[j].totalBayes
          };
        }
      }
    }

    for (let i = 0; i < this.options.length; i++) {
      this.options[i] = {
        id: this.options[i].id,
        option: this.options[i].option,
        nProb1: this.options[i].nProb1,
        prob1: this.options[i].prob1,
        nProb2: this.options[i].nProb2,
        prob2: this.options[i].prob2,
        nprobParcial: this.options[i].nprobParcial,
        probParcial: this.options[i].probParcial,
        nprobTotal: this.options[i].nprobTotal,
        probTotal: this.options[i].probTotal,
        totalBayes: this.options[i].probParcial / this.options[i].probTotal
      };
    }

    if (
      this.options[this.options.length - 1].option !== "Selecione una opcion"
    ) {
      this.options[this.options.length] = {
        id: this.options.length + "",
        option: "Selecione una opcion",
        nProb1: "",
        prob1: 0,
        nProb2: "",
        prob2: 0,
        nprobParcial: "Probabilidad individual",
        probParcial: 0,
        nprobTotal: "Probabilidad total",
        probTotal: 0,
        totalBayes: 0
      };
      this.setOptionId(this.options.length - 1);
    }

    console.log(this.options);

    this.formOptions = true;
  }

  setOptionId(id) {
    this.idOption = id;
  }

  getOptionId() {
    return this.idOption;
  }

  ngOnInit() {}
}

export interface Name {
  id: String;
  positionN1: number;
  positionN2: number;
  name: String;
}

export interface Probability {
  id: String;
  positionN1: number;
  positionN2: number;
  name: String;
  probability: number;
}

export interface Options {
  id: String;
  option: String;
  nProb1: String;
  prob1: number;
  nProb2: String;
  prob2: number;
  nprobParcial: String;
  probParcial: number;
  nprobTotal: String;
  probTotal: number;
  totalBayes: number;
}
