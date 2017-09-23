import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Http } from '@angular/http';
import { ViewContainerRef } from '@angular/core';
import _ from 'lodash';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-newruta',
  templateUrl: './newruta.component.html',
  styleUrls: ['./newruta.component.css']
})
export class NewrutaComponent implements OnInit {
  name = '';
  start = '';
  startCoordinates;
  endCoordinates;
  end = '';
  horas = _.range(1, 25);
  minutos = _.range(0, 60);
  savingRoute = false;

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
      active: false
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
      active: false
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
      active: false
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
      active: false
    },

  ];
  
  constructor(public http: Http, 
              public toastr: ToastsManager,
              public viewContainerRef: ViewContainerRef
            ) { 
            this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
  }

  saveAddress(){
    const self = this;
    self.savingRoute = true;
    // Get start and end coordinates
    const gapiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    let startUrl = `${gapiUrl}address=${this.start}&key=AIzaSyCLHVsmTkK8mWKnfYJUEQmkUFsy_KI1kIs`;
    let endUrl = `${gapiUrl}address=${this.end}&key=AIzaSyCLHVsmTkK8mWKnfYJUEQmkUFsy_KI1kIs`;
    /*this.http.request(startUrl).subscribe(function(response){
      this.startCoordinates = response.text());
    });*/ 
    self.http.request(startUrl).subscribe(function(startResponse){
      const parsedStartResponse = JSON.parse(startResponse.text()).results[0];
      self.startCoordinates = parsedStartResponse ? JSON.parse(startResponse.text()).results[0].geometry.location : null;
      self.http.request(endUrl).subscribe(function(endResponse){
        const parsedEndResponse = JSON.parse(endResponse.text()).results[0];
        self.endCoordinates = parsedEndResponse ? JSON.parse(endResponse.text()).results[0].geometry.location : null;
        self.savingRoute = false;
        if(self.endCoordinates && self.startCoordinates){
          self.saveAddressOnFirebase();
        }else{
          self.toastr.error('Corrige las direcciones!', 'Error');
        }
      });
    });
  }

  saveAddressOnFirebase(){

  }

}
