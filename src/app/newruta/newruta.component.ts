import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import {} from "googlemaps";
import { Router } from "@angular/router";
import { Ruta, RutasService } from "../rutas.service";
@Component({
  selector: "app-newruta",
  templateUrl: "./newruta.component.html",
  styleUrls: ["./newruta.component.css"]
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
    }
  ];
  horas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  minutos = [];
  franjas = ["AM", "PM"];
  ruta: Ruta = {
    key: "",
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
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private rutaServ: RutasService
  ) {}

  ngOnInit() {}
  save() {
    console.log("save");
    this.rutaServ.guardarRuta(this.ruta).then(()=>{
      this.router.navigate(["/home"]);
    });
  }
  back() {
    this.router.navigate(["/home"]);
  }
}
