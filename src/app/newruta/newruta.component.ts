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
  constructor() { 

  }

  ngOnInit() {
  }

}
