import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { RutasService, Ruta, BUSCAR, ACTIVO, EMPEZAR } from "../rutas.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomePageComponent {
  title = "Home";
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

  days = [
    {
      label: "DO",
      active: false,
      fireLabel: "D"
    },
    {
      label: "LU",
      active: false,
      fireLabel: "L"
    },
    {
      label: "MA",
      active: true,
      fireLabel: "M"
    },
    {
      label: "MI",
      active: false,
      fireLabel: "I"
    },
    {
      label: "JU",
      active: false,
      fireLabel: "J"
    },
    {
      label: "VI",
      active: true,
      fireLabel: "V"
    },
    {
      label: "SA",
      active: false,
      fireLabel: "S"
    }
  ];
  username: string;
  userpic: string;
  constructor(
    private router: Router,
    private authService: LoginService,
    public rutaServ: RutasService
  ) {
    this.authService.user.subscribe(user => {
      this.username = user.displayName;
      this.userpic = user.photoURL;
    });
  }
  getReverseGeocoding(address) {
    return address;
  }
  add() {
    this.router.navigate(["/newruta"]);
  }
  travelers(viajeKey){
    this.router.navigate(["/viajeros-viaje/" + viajeKey]);
  }
  getName(estado: number) {
    switch (estado) {
      case ACTIVO:
        return "ACTIVO";
      case BUSCAR:
        return "BUSCANDO";
      case EMPEZAR:
        return "EN CURSO";
      default:
        return "";
    }
  }
  editRoute(ruta: Ruta) {
    switch (ruta.estado) {
      case ACTIVO:
        ruta.estado = BUSCAR;
        break;
      case BUSCAR:
        ruta.estado = EMPEZAR;
        break;
      case EMPEZAR:
        ruta.estado = ACTIVO;
        break;
      default:
        break;
    }
    this.rutaServ.editarRuta(ruta);
  }

  returnViajes(viajes){
    if(!viajes){ 
      return false;
    }
    var arr = [];
    var key = Object.keys(viajes)[0]
    arr.push(viajes[key]);
    if(viajes){
      return arr;
    }
  }
}
