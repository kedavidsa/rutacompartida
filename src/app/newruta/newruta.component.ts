import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { } from "googlemaps";
import { Router } from "@angular/router";
import { Ruta, RutasService, ACTIVO } from "../rutas.service";
import { Http } from "@angular/http";
import { ViewContainerRef } from "@angular/core";
import _ from "lodash";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { LoginService } from "../login.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: "app-newruta",
  templateUrl: "./newruta.component.html",
  styleUrls: ["./newruta.component.css"]
})
export class NewrutaComponent implements OnInit {
  name = "";
  start = "";
  startCoordinates;
  endCoordinates;
  end = "";
  savingRoute = false;

  rutaFormControl = new FormControl("", [Validators.required]);
  diriniFormControl = new FormControl("", [Validators.required]);
  dirdestFormControl = new FormControl("", [Validators.required]);
  suggestions = [];

  days = [
    {
      label: "LU",
      key: "L",
      active: false
    },
    {
      label: "MA",
      key: "M",
      active: false
    },
    {
      label: "MI",
      key: "I",
      active: false
    },
    {
      label: "JU",
      key: "J",
      active: false
    },
    {
      label: "VI",
      key: "V",
      active: false
    },
    {
      label: "SA",
      key: "S",
      active: false
    },
    {
      label: "DO",
      key: "D",
      active: false
    }
  ];

  types = [
    {
      label: "local_taxi",
      key: "taxi",
      active: false
    },
    {
      label: "directions_car",
      key: "car",
      active: false
    },
    {
      label: "directions_bus",
      key: "bus",
      active: false
    },
    {
      label: "directions_bike",
      key: "bike",
      active: false
    },
    {
      label: "directions_walk",
      key: "walk",
      active: false
    }
  ];

  ruta: Ruta = {
    key: "",
    nombre: "",
    estado: ACTIVO,
    init: {
      direccion: "",
      lat: "",
      long: ""
    },
    end: {
      direccion: "",
      lat: "",
      long: ""
    },
    days: {
      L: false,
      M: false,
      I: false,
      J: false,
      V: false,
      S: false,
      D: false
    },
    types: {
      taxi: false,
      bus: false,
      bike: false,
      car: false,
      walk: false
    }
  };

  @ViewChild("search") public searchElementRef: ElementRef;
  username: string;
  userpic: string;
  emptySuggestions: any[];
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private rutaServ: RutasService,
    public http: Http,
    public toastr: ToastsManager,
    public viewContainerRef: ViewContainerRef,
    private authService: LoginService,
  ) {
    // Listener for autocomplete
    this.diriniFormControl.valueChanges
    .startWith(null)
    .subscribe(query => query ? this.autocompleteAddresses(query).then(data => { 
      this.suggestions = [];
      for(let i in data){
        this.suggestions.push(data[i]);
      }
    }) : []);
    // Listener for autocomplete
    this.dirdestFormControl.valueChanges
    .startWith(null)
    .subscribe(query => query ? this.autocompleteAddresses(query).then(data => { 
      this.suggestions = [];
      for(let i in data){
        this.suggestions.push(data[i]);
      }
    }) : []);

    this.authService.user.subscribe(user => {
      if (user) {
        this.username = user.displayName;
        this.userpic = user.photoURL;
      }
    });
    this.toastr.setRootViewContainerRef(viewContainerRef);
    this.authService.user.subscribe(user => {
      this.username = user.displayName;
      this.userpic = user.photoURL;
    });
  }

  ngOnInit() { }

  saveAddressOnFirebase() {

    this.ruta.init.lat = this.startCoordinates.lat;
    this.ruta.init.long = this.startCoordinates.lng;
    this.ruta.end.lat = this.endCoordinates.lat;
    this.ruta.end.long = this.endCoordinates.lng;
    this.days.forEach(a => {
      this.ruta.days[a.key] = a.active;
    });
    this.types.forEach(a => {
      this.ruta.types[a.key] = a.active;
    });
    this.rutaServ.guardarRuta(this.ruta).then(() => {
      this.router.navigate(["/home"]);
    });
  }

  back() {
    this.router.navigate(["/home"]);
  }

  autocompleteAddresses(query: string) {
    const replaced = query.replace(' ', '+');
    const apiUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${query}&category=&location=&distance=&f=pjson&countryCode=CO`;
    return new Promise(resolve =>{
      this.http.request(apiUrl)
      .subscribe(data => {
        resolve(data.json().suggestions)
      })
    });
  }

  save() {
    const self = this;
    self.savingRoute = true;

    const gapiUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&maxLocations=1&";
    let startUrl = `${gapiUrl}&Address=${this.start}`;
    let endUrl = `${gapiUrl}&Address=${this.end}`;

    self.http.request(startUrl).subscribe(function (startResponse) {

      const parsedStartResponse = JSON.parse(startResponse.text());
      if (parsedStartResponse.candidates != null && parsedStartResponse.candidates[0] && parsedStartResponse.candidates[0].score == 100) {
        let startCandidate = parsedStartResponse.candidates[0];
        self.startCoordinates = { lat: startCandidate.location.y, lng: startCandidate.location.x }

        self.http.request(endUrl).subscribe(function (endResponse) {
          const parsedEndResponse = JSON.parse(endResponse.text());
          if (parsedEndResponse.candidates != null && parsedEndResponse.candidates[0] && parsedEndResponse.candidates[0].score == 100) {
            let endCandidate = parsedEndResponse.candidates[0];
            self.endCoordinates = { lat: endCandidate.location.y, lng: endCandidate.location.x }
            self.saveAddressOnFirebase();

          }
          else {
            self.savingRoute = false;
            self.toastr.error("Corrige las direcciones!", "Error");
          }

        });

      }
      else {
        self.savingRoute = false;
        self.toastr.error("Corrige las direcciones!", "Error");
      }

    });

    // Get start and end coordinates
    /*const gapiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
    let startUrl = `${gapiUrl}address=${this
      .start}&key=AIzaSyCLHVsmTkK8mWKnfYJUEQmkUFsy_KI1kIs`;
    let endUrl = `${gapiUrl}address=${this
      .end}&key=AIzaSyCLHVsmTkK8mWKnfYJUEQmkUFsy_KI1kIs`;
    

    self.http.request(startUrl).subscribe(function(startResponse) {
      const parsedStartResponse = JSON.parse(startResponse.text()).results[0];
      console.log(parsedStartResponse);
      self.startCoordinates = parsedStartResponse
        ? JSON.parse(startResponse.text()).results[0].geometry.location
        : null;
      self.http.request(endUrl).subscribe(function(endResponse) {
        const parsedEndResponse = JSON.parse(endResponse.text()).results[0];
        self.endCoordinates = parsedEndResponse
          ? JSON.parse(endResponse.text()).results[0].geometry.location
          : null;
        self.savingRoute = false;
        if (self.endCoordinates && self.startCoordinates) {
          console.log(self.startCoordinates);
          console.log(self.endCoordinates);
          self.saveAddressOnFirebase();
        } else {
          self.toastr.error("Corrige las direcciones!", "Error");
        }
      });
    });*/
  }

  geocodeArcgis(address: string) {
    var startUrl = `${address}`;
  }

  logout() {
    this.authService.logout();
  }

  buttonState() {
    // Route has a name
    const routeHasAName = this.name.length > 0;
    // Route has first address
    const routeHasFirstAddress = this.start.length > 0;
    // Route has second address
    const routeHasSecondAddress = this.end.length > 0;
    // Route has at least one day
    const selectedDays = _.filter(this.days, day => {
      return day.active;
    });
    const hasSelectedDays = selectedDays.length > 0;
    // Route has at list one vehicle
    const selectedTypes = _.filter(this.types, type => {
      return type.active;
    });
    const hasSelectedTypes = selectedTypes.length > 0;
    return routeHasAName && routeHasFirstAddress && routeHasSecondAddress && hasSelectedDays && hasSelectedTypes;
  }

}
