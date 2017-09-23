import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-newruta',
  templateUrl: './newruta.component.html',
  styleUrls: ['./newruta.component.css']
})
export class NewrutaComponent implements OnInit {
  rutaFormControl = new FormControl("", [Validators.required]);
  diriniFormControl = new FormControl("", [Validators.required]);
  dirdestFormControl = new FormControl("", [Validators.required]);
  days = [
    {
      label: "LU",
      active: false
    },
    {
      label: "MA",
      active: true
    },
    {
      label: "MI",
      active: false
    },
    {
      label: "JU",
      active: false
    },
    {
      label: "VI",
      active: true
    },
    {
      label: "SA",
      active: false
    },
    {
      label: "DO",
      active: false
    }
  ];

  types = [
    {
      label: "local_taxi",
      active: false
    },
    {
      label: "directions_car",
      active: true
    },
    {
      label: "directions_bus",
      active: false
    },
    {
      label: "directions_bike",
      active: false
    },
    {
      label: "directions_walk",
      active: true
    },

  ];
  
  constructor() { 

  }

  ngOnInit() {
  }

}
